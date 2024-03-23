import { AccountModel } from 'src/app/models/iam/account.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SessionService {
  public currentUser: AccountModel;

  constructor(private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
