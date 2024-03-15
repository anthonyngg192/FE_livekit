import * as _ from 'lodash';
import { QueryModel } from './query.model';

export class PagingQueryModel extends QueryModel {
  fullTextSearch?: string;
  textSearch?: string;
  page? = 1;
  limit? = 20;
  excludeIds?: string;

  constructor(item: QueryModel = {}) {
    super();
    _.assignIn(this, item);
  }
}
