import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { PermissionModel } from 'src/app/models/iam/permission.model';
import { ProfileModel } from 'src/app/models/base/profile.model';
import { UpdatePasswordModel } from './models/update-password.model';

@Injectable()
export class ProfileService extends BaseService {
  protected baseUrl: string = environment.iamUrl;

  async get() {
    return this.returnObj<ProfileModel>(await this.httpService.get(`${this.baseUrl}/profile`));
  }

  async update(data: ProfileModel) {
    return this.httpService.put(`${this.baseUrl}/profile`, data);
  }

  async getPermissions() {
    return this.returnObj<PermissionModel[]>(await this.httpService.get(`${this.baseUrl}/profile/permissions`));
  }

  async updatePassword(data: UpdatePasswordModel) {
    return this.httpService.put(`${this.baseUrl}/profile/password`, data);
  }
}
