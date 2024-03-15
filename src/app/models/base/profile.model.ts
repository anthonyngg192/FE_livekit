import { AccountModel } from '../iam/account.model';

export class ProfileModel extends AccountModel {
  token?: string;
}
