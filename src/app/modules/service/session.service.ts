import { AccountModel } from 'src/app/models/iam/account.model';
import { Injectable } from '@angular/core';
import { PermissionModel } from 'src/app/models/iam/permission.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SessionService {
  public currentUser: AccountModel;
  public permissions: PermissionModel[] = [];
  public permissions$ = new Subject<PermissionModel[]>();

  constructor(private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.permissions$.subscribe((permissions) => (this.permissions = permissions));
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  login(profile: AccountModel, token: string) {
    this.currentUser = profile;
    localStorage.setItem('currentUser', JSON.stringify(profile));
    localStorage.setItem('token', token);
  }
}
