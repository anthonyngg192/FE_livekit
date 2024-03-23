import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { ProfileModel } from 'src/app/models/base/profile.model';
import { UpdatePasswordModel } from './models/update-password.model';

@Injectable()
export class ProfileService extends BaseService {
  protected baseUrl: string = environment.apiEndpoint;

  async get() {
    return this.returnObj<ProfileModel>(await this.httpService.get(`${this.baseUrl}/profile`));
  }

  async update(data: ProfileModel) {
    return this.httpService.put(`${this.baseUrl}/profile`, data);
  }

  async updatePassword(data: UpdatePasswordModel) {
    return this.httpService.put(`${this.baseUrl}/profile/password`, data);
  }
}
