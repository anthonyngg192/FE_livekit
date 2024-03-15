import { BaseModel } from 'src/app/models/base/base.model';

export class BankAccountModel extends BaseModel {
  bank: string;
  branch: string;
  account: string;
  // eslint-disable-next-line id-denylist
  number: number;
  order = 1;
}
