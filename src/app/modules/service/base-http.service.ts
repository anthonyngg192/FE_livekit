import { BaseModel } from 'src/app/models/base/base.model';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { omit } from 'lodash';
import { PagingQueryModel } from 'src/app/models/base/paging.query.model';
import { QueryModel } from 'src/app/models/base/query.model';

@Injectable()
export abstract class BaseHttpService<T extends BaseModel, Z extends T = T> extends BaseService {
  protected abstract key: string;
  protected abstract pluralKey: string;

  async get(id: string) {
    return this._getObject<T>(`${this.key}/${id}`);
  }

  async filter(query: QueryModel = {}) {
    return super._filter<T>(query, this.key);
  }

  async paging(query: PagingQueryModel = {}) {
    return super._paging<T>(query, this.pluralKey);
  }

  async update<U extends T = T>(data: U) {
    return this.httpService.put(
      `${this.baseUrl}/${this.key}/${data._id}`,
      omit(data, ['_id', 'createdAt', 'updatedAt']),
    );
  }

  async create<C extends T = T>(data: C) {
    return this.httpService.post<C>(`${this.baseUrl}/${this.key}`, data);
  }

  async save<S extends T = T>(data: S) {
    return data._id ? this.update(data) : this.create(data);
  }

  async delete(id: string) {
    return this.httpService.delete(`${this.baseUrl}/${this.key}/${id}`);
  }
}
