import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../modules/service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SessionService } from './../../modules/service/session.service';
import { TranslateService } from '@ngx-translate/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;

  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private authenticationService: AuthenticationService,
    private fb: UntypedFormBuilder,
    private messageService: NzMessageService,
    private translateService: TranslateService,
  ) {
    this.initLoginForm();
    if (this.sessionService.currentUser) {
      this.router.navigate(['/']);
    }
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: [null, [Validators.required, Validators.maxLength(32), Validators.minLength(8)]],
    });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  async login() {
    this.loading = true;
    this.submitted = true;
    const data = this.loginForm.getRawValue();

    const errorMessage = await this.authenticationService.login(data.email, data.password);
    if (errorMessage) {
      this.loading = false;
      this.messageService.error(errorMessage);
    } else {
      this.messageService.success(this.translateService.instant('loginSuccess'));
      this.router.navigate([this.returnUrl]);
    }
  }
}
