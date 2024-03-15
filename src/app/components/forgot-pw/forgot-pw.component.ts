import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../modules/service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-pw',
  templateUrl: './forgot-pw.component.html',
  styleUrls: ['./forgot-pw.component.less'],
})
export class ForgotPwComponent implements OnInit {
  email = '';
  loading = false;
  submitted = false;
  notifyResetPwPage = false;
  forgotPwPage = true;
  returnUrl: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private translateService: TranslateService,
    private modalService: NzModalService,
  ) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  async forgotPw() {
    this.loading = true;
    this.submitted = true;
    const captcha = grecaptcha.getResponse();
    const result = await this.authenticationService.forgotPw(this.email, captcha);
    if (result && result.data) {
      this.notifyResetPwPage = true;
      this.forgotPwPage = false;
    } else {
      this.modalService.error({
        nzTitle: this.translateService.instant('forgotPw'),
        nzContent: result.message,
      });
    }
  }

  notifyResetPw() {
    this.router.navigate([this.returnUrl]);
  }
}
