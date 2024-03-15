import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { LanguageModel } from '../../../models/base/language.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
@Pipe({
  name: 'trans',
})
export class TransPipe implements PipeTransform {
  constructor(private readonly translateService: TranslateService) {}

  transform(value: LanguageModel) {
    return value && ((value[this.translateService.currentLang] || value[this.translateService.defaultLang]) as string);
  }
}
