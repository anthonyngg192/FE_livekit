import { BaseModel } from '../base/base.model';
import { Role } from '../base/role';

export class AccountModel extends BaseModel {
  id: number;
  phone: string;
  email: string;
  password: string;
  name: string;
  role: Role;
  coverImage?: string;
  avatar?: string;
}
