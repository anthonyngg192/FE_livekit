import * as _ from 'lodash';
import * as moment from 'moment';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { IResponse } from './../helper/models/IResponse';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { PagingModel } from 'src/app/models/base/paging.model';
import { PagingQueryModel } from 'src/app/models/base/paging.query.model';
import { QueryModel } from 'src/app/models/base/query.model';

@Injectable()
export abstract class BaseService {
  protected abstract baseUrl: string;
  constructor(public httpService: HttpService) {}

  protected async _getObject<T>(url: string) {
    const response = await this.httpService.get(`${this.baseUrl}/${url}`);

    return this.returnObj<T>(response);
  }

  protected async _filter<T>(query = {}, url: string) {
    const response = await this.httpService.get(`${this.baseUrl}/${url}?${this.buildQueryString(query)}`);

    return this.returnList<T>(response);
  }

  protected async _paging<T>(query = new PagingQueryModel(), url: string) {
    const response = await this.httpService.get(`${this.baseUrl}/${url}?${this.buildQueryString(query)}`);
    return this.returnObj<PagingModel<T>>(response);
  }

  protected returnList<T>(response: IResponse) {
    return (!response.statusCode ? response.data : []) as T[];
  }

  protected returnObj<T>(response: IResponse) {
    return (!response.statusCode ? response.data : {}) as T;
  }

  public getValueOfObject(object: Record<string, any> = {}, field: string) {
    const fields = field.split('.');
    let item = object;
    for (let index = 0; index < fields.length; index++) {
      const fieldName = fields[index];
      item = item[fieldName];
    }

    return item;
  }

  public mapToTree<T extends { children: T[] }>(
    items: T[],
    titleField = 'name',
    keyField = '_id',
  ): NzTreeNodeOptions[] {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length;
      return hasChildren
        ? {
            title: _.get(item, titleField),
            key: _.get(item, keyField),
            children: this.mapToTree(item.children, titleField, keyField),
            selectable: true,
          }
        : {
            title: _.get(item, titleField),
            key: _.get(item, keyField),
            isLeaf: true,
          };
    });
  }

  convertFlatToStructure<T extends { parentId?: string; _id?: string; children?: T[] }>(
    records: T[],
    containParentId = true,
  ) {
    _.forEach(records, (x) => {
      const parent = _.find(records, (y) => y._id === x.parentId);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(x);
      }
    });

    const flatResults = _.filter(records, (x) => !x.parentId);

    if (!containParentId) {
      const childrenResults = _.filter(records, (x) => !!x.parentId);
      _.forEach(childrenResults, (x) => {
        delete x.parentId;
      });
    }

    return flatResults;
  }

  public findTree<T extends { children: T[] }>(items: T[], id, keyField = '_id') {
    let foundItem = items.find((i) => i[keyField] === id);
    if (foundItem) {
      return foundItem;
    }

    for (const item of items) {
      if (item.children && item.children) {
        foundItem = this.findTree(item.children, id, keyField);
        if (foundItem) {
          return foundItem;
        }
      }
    }

    return null;
  }

  public buildQueryString(model: QueryModel): string {
    const queryString = [];
    model = _.cloneDeep(model);
    for (const key in model) {
      if (model.hasOwnProperty(key)) {
        const element = model[key];
        if (!_.isUndefined(element) && !_.isFunction(element) && _.toString(element) !== '') {
          switch (key) {
            case 'createdAtFrom':
              queryString.push(`${key}=${moment(element).startOf('day').valueOf()}`);
              break;

            case 'createdAtTo':
              queryString.push(`${key}=${moment(element).endOf('day').valueOf()}`);
              break;

            default:
              queryString.push(`${key}=${element}`);
          }
        }
      }
    }

    return queryString.join('&');
  }
}
