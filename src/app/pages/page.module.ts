import { AuthGuard } from './../auth.guard';
import { ForgotPwComponent } from '../components/forgot-pw/forgot-pw.component';
import { HelperModule } from '../modules/helper/helper.module';
import { LockOutline, UserOutline } from '@ant-design/icons-angular/icons';
import { LoginComponent } from '../components/login/login.component';
import { NgModule } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { PageComponent } from './components/page.component';
import { ResetPwComponent } from '../components/reset-pw/reset-pw.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    NzLayoutModule,
    NzMenuModule,
    NzIconModule.forRoot([LockOutline, UserOutline]),
    NzDropDownModule,
    HelperModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPwComponent },
      { path: 'reset-password', component: ResetPwComponent },
      {
        path: 'page',
        component: PageComponent,
        canActivate: [AuthGuard],
        children: [{ path: 'home', loadChildren: () => import('./home/home.module').then((x) => x.HomeModule) }],
      },
    ]),
  ],
  declarations: [PageComponent],
})
export class PageModule {}
