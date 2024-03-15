import { FormsModule } from '@angular/forms';
import { MultilangFieldModule } from '../multilang-field/multilang-field.module';
import { NgModule } from '@angular/core';
import { TranslatedSlugInputComponent } from './translated-slug-input.component';

@NgModule({
  imports: [MultilangFieldModule, FormsModule],
  declarations: [TranslatedSlugInputComponent],
  exports: [TranslatedSlugInputComponent],
})
export class TranslatedSlugInputModule { }
