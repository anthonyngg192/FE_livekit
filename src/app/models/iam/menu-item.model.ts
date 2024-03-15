import * as _ from 'lodash';
import { BaseModel } from 'src/app/models/base/base.model';
import { LanguageModel } from '../base/language.model';
import { MenuItemType } from 'src/app/consts/iam/menu-item-type.const';
import { MenuTypeEnum } from 'src/app/consts/iam/menu-type.const';

export class MenuItemModel extends BaseModel {
  name = new LanguageModel();
  menuId: string;
  parentId: string;
  url: string;
  order = 0;
  children: MenuItemModel[];
  type = MenuItemType.LINK;
  menuType = MenuTypeEnum.GLOBAL_TOP_MENU;
  objId?: string;
  icon?: string;
  image?: string;
  highlight = false;

  constructor(item = null) {
    super();
    _.assignIn(this, item);
  }
}
