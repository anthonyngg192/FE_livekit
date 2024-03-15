import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../modules/service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SessionService } from './../../modules/service/session.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reset-pw',
  templateUrl: './reset-pw.component.html',
  styleUrls: ['./reset-pw.component.less'],
})
export class ResetPwComponent implements OnInit {
  password = '';
  rePassword = '';
  token = '';
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private translateService: TranslateService,
    private modalService: NzModalService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.token = params.token;
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  async resetPw() {
    this.loading = true;
    this.submitted = true;
    const result = await this.authenticationService.resetPw(this.password, this.rePassword, this.token);
    if (result && result.data) {
      this.router.navigate([this.returnUrl]);
    } else {
      this.modalService.error({
        nzTitle: this.translateService.instant('forgotPw'),
        nzContent: result.message,
      });
    }
  }
}
