import { BaseModel } from '../base/base.model';

export class StoreModel extends BaseModel {
  name: string;
  def?: boolean;
  order = 1;
}
