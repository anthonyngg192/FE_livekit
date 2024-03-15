import { ActiveStatus } from 'src/app/consts/iam/active-status.const';
import { assignIn } from 'lodash';
import { BaseModel } from 'src/app/models/base/base.model';
import { LanguageModel } from '../base/language.model';
import { MenuTypeEnum } from 'src/app/consts/iam/menu-type.const';


export class MenuModel extends BaseModel {
  name = new LanguageModel();
  type = MenuTypeEnum.GLOBAL_TOP_MENU;
  regionIds: string[] = [];
  status = ActiveStatus.ACTIVE;
  description = new LanguageModel();

  constructor(item = null) {
    super();
    assignIn(this, item);
  }
}
