import * as _ from 'lodash';

export abstract class BaseModel {
  _id?: string;
  createdAt?: number;
  updatedAt?: number;

  constructor(item = null) {
    _.assignIn(this, item);
  }
}
