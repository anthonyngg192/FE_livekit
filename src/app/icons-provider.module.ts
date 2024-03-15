import {
  DashboardOutline,
  EditTwoTone,
  FormOutline,
  LockOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  PlusOutline,
  UploadOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  FormOutline,
  EditTwoTone,
  UserOutline,
  LockOutline,
  UploadOutline,
  PlusOutline,
];
@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class IconsProviderModule {}
