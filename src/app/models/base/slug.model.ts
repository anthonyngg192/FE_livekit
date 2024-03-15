import { LanguageModel } from './language.model';

export class TranslatedSlugModel {
  prefix?: string;
  value = new LanguageModel();
  postfix?: string;
}
