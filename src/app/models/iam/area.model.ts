import { ActiveStatus } from 'src/app/consts/iam/active-status.const';
import { AreaLevelEnum } from 'src/app/consts/iam/area-level.const';
import { BaseModel } from '../base/base.model';

export class AreaModel extends BaseModel {
  name: string;
  def?: boolean;
  order = 1;
  level: AreaLevelEnum;
  parentId: string;
  status = ActiveStatus.ACTIVE;
}
