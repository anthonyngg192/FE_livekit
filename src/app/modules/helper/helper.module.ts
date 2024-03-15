import { CommonModule } from '@angular/common';
import { DateTimePipe } from './pipes/datetime.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullNamePipe } from './pipes/full-name.pipe';
import { HttpClientModule } from '@angular/common/http';
import { MoneyPipe } from './pipes/money.pipe';
import { NgModule } from '@angular/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { OrderByPipe } from './pipes/order-by.pipe';
import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';
import { PageWrapperDetailComponent } from './components/page-wrapper-detail/page-wrapper-detail.component';
import { SpinnerProcessingModalComponent } from 'src/app/components/spinner-processing-modal/spinner-processing-modal.component';
import { TranslationModule } from '../translation/translation.module';
import { TransPipe } from './pipes/trans.pipe';
import { TransSlugPipe } from './pipes/trans-slug.pipe';
import { UploaderComponent } from './components/uploader/uploader.component';
const antModules = [
  TranslationModule,
  CommonModule,
  NzButtonModule,
  NzCardModule,
  NzCheckboxModule,
  NzDatePickerModule,
  NzDividerModule,
  NzFormModule,
  NzGridModule,
  NzModalModule,
  NzNotificationModule,
  NzPageHeaderModule,
  NzSelectModule,
  NzTableModule,
  NzInputNumberModule,
  NzUploadModule,
  NzAlertModule,
  NzInputModule,
  NzImageModule,
  NzTabsModule,
  NzMessageModule,
  NzSwitchModule,
];
const components = [
  PageWrapperComponent,
  PageWrapperDetailComponent,
  UploaderComponent,
  DateTimePipe,
  FullNamePipe,
  OrderByPipe,
  TransPipe,
  TransSlugPipe,
  MoneyPipe,
  SpinnerProcessingModalComponent,
];

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, ...antModules],
  declarations: components,
  exports: [...antModules, ...components],
  providers: [TransPipe],
})
export class HelperModule {}
