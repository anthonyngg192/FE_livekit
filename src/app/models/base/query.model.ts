import { BaseModel } from './base.model';
import { SortTypeEnum } from '../../consts/common/sort-type.const';

export class QueryModel extends BaseModel {
  [index: string]: any;
  sortBy?: string;
  sortType?: SortTypeEnum;
}
