import { CKEditorModule } from 'ng2-ckeditor';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultilangFieldComponent } from './multilang-field.component';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { TranslationModule } from 'src/app/modules/translation/translation.module';

@NgModule({
  imports: [
    NzTabsModule,
    CKEditorModule,
    FormsModule,
    CommonModule,
    TranslationModule,
    NzInputModule,
    NzSelectModule,
    NzIconModule,
  ],
  declarations: [MultilangFieldComponent],
  exports: [MultilangFieldComponent],
})
export class MultilangFieldModule {}
