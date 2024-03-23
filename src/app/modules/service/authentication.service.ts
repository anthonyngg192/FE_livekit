import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { SessionService } from './session.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private httpService: HttpService,
    private sessionService: SessionService,
  ) {}

  async login(email: string, password: string) {
    const result = await this.httpService.post<any>(`${environment.apiEndpoint}/auth/login`, {
      email,
      password,
    });
    if (!result.statusCode) {
      this.sessionService.login(result.data.profile, result.data.token);
      return null;
    }

    return result.message;
  }

  async forgotPw(email: string, captcha: string) {
    return this.httpService.post(`${environment.apiEndpoint}/auth/forgot-password`, { email, captcha });
  }

  async resetPw(password: string, rePassword: string, token: string) {
    return this.httpService.post(`${environment.apiEndpoint}/auth/reset-password`, { password, rePassword, token });
  }
}
