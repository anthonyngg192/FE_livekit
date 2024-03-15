import * as i18n from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import enExtra from '@angular/common/locales/extra/en';
import vi from '@angular/common/locales/vi';
import viExtra from '@angular/common/locales/extra/vi';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { EmptyContentComponent } from './components/empty-content/empty-content.component';
import { ForgotPwComponent } from './components/forgot-pw/forgot-pw.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HelperModule } from './modules/helper/helper.module';
import { HttpClientModule } from '@angular/common/http';
import { IconsProviderModule } from './icons-provider.module';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { PageModule } from './pages/page.module';
import { RecaptchaModule } from 'ng-recaptcha';
import { registerLocaleData } from '@angular/common';
import { ResetPwComponent } from './components/reset-pw/reset-pw.component';
import { RouterModule } from '@angular/router';
import { ServiceModule } from './modules/service/service.module';

registerLocaleData(vi, 'vi', viExtra);
registerLocaleData(en, 'en', enExtra);

@NgModule({
  declarations: [AppComponent, LoginComponent, ForgotPwComponent, ResetPwComponent, EmptyContentComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        { path: '', redirectTo: 'page/home', pathMatch: 'full' },
        { path: '**', redirectTo: 'page/home' },
      ],
      { useHash: true },
    ),
    IconsProviderModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HelperModule,
    ServiceModule,
    PageModule,
    RecaptchaModule,
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: i18n[`${localStorage.getItem('language') || 'vi'}_${localStorage.getItem('region') || 'VN'}`],
    },
    {
      provide: NZ_CONFIG,
      useValue: {
        empty: {
          nzDefaultEmptyContent: EmptyContentComponent,
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
