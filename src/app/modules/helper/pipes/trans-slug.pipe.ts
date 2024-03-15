import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { TranslatedSlugModel } from 'src/app/models/base/slug.model';
import { TransPipe } from './trans.pipe';

@Injectable()
@Pipe({
  name: 'transSlug',
})
export class TransSlugPipe implements PipeTransform {
  constructor(private readonly transPipe: TransPipe) {}

  transform(slugs: TranslatedSlugModel) {
    return [slugs.prefix, this.transPipe.transform(slugs.value), slugs.postfix].filter((x) => x).join('');
  }
}
