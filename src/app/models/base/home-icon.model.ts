import { assignIn } from 'lodash';
import { BaseModel } from 'src/app/models/base/base.model';
import { LanguageModel } from './language.model';

export class HomeIconModel extends BaseModel {
  name = new LanguageModel();
  link = '';
  icon = '';
  order = 0;

  constructor(item = null) {
    super();
    assignIn(this, item);
  }
}
