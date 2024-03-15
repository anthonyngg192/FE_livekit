import { BaseModel } from '../base/base.model';
import { LanguageModel } from '../base/language.model';

export class AccountGroupModel extends BaseModel {
  name: LanguageModel;
  leaderId: string;
}
