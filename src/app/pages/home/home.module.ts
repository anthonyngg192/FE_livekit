import { FormsModule } from '@angular/forms';
import { HelperModule } from 'src/app/modules/helper/helper.module';
import { HomeComponent } from './components/home.component';
import { NgModule } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { RouterModule } from '@angular/router';
import { ServiceModule } from 'src/app/modules/service/service.module';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
    HelperModule,
    ServiceModule,
    FormsModule,
    NzCardModule,
    NzTableModule,
    NzModalModule,
    NzSwitchModule,
    NzTabsModule,
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
