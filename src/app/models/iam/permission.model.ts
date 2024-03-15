import { BaseModel } from '../base/base.model';
import { PermissionAppEnum } from 'src/app/consts/permission-app.const';
import { PermissionEnum } from 'src/app/consts/permission.const';

export class PermissionModel extends BaseModel {
  app: PermissionAppEnum;
  feature: string;
  permissions: PermissionEnum[];
}
