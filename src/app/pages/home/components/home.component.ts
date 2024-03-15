import { AccountModel } from 'src/app/models/iam/account.model';
import { Component } from '@angular/core';
import { SessionService } from 'src/app/modules/service/session.service';

@Component({
  templateUrl: 'home.component.html',
})
export class HomeComponent {
  currentUser: AccountModel;

  constructor(private sessionService: SessionService) {
    this.currentUser = this.sessionService.currentUser;
  }
}
