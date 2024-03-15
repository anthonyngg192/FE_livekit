import { AccountModel } from 'src/app/models/iam/account.model';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/modules/service/profile.service';
import { SessionService } from 'src/app/modules/service/session.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.less'],
})
export class PageComponent implements OnInit {
  account: AccountModel;
  isCollapsed = false;

  constructor(
    private readonly sessionService: SessionService,
    private readonly profileService: ProfileService,
    private readonly translateService: TranslateService,
  ) {
    this.account = this.sessionService.currentUser;
  }

  async ngOnInit() {
    this.sessionService.permissions$.next(await this.profileService.getPermissions());
  }

  logout() {
    this.sessionService.logout();
  }

  public changeLanguage(language: string, region: string) {
    this.translateService.use(language);
    localStorage.setItem('language', language);
    localStorage.setItem('region', region);
    window.location.reload();
  }
}
