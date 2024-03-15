import { AccountModel } from 'src/app/models/iam/account.model';
import { ActivityType } from '../../common/constants/activity.type';
import { BaseModel } from 'src/app/models/base/base.model';

export class ActivityModel extends BaseModel {
  type: ActivityType;
  actor: AccountModel;
  orderId: string;
}
