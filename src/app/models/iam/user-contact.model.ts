import { BaseModel } from '../base/base.model';
import { ContactTypeEnum } from 'src/app/consts/common/contact-type.const';

export class UserContactModel extends BaseModel {
  userId: string;
  type = ContactTypeEnum.SHIPPING;
  name: string;
  phone: string;
  email: string;
  taxNumber: string;
  provinceId: string;
  districtId: string;
  wardId: string;
  address: string;
  mapAddress: string;
  def = false;
}
