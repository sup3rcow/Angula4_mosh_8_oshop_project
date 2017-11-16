import { Component, ViewEncapsulation } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BsNavbarComponent {

  // jer auth koristi u html-u - templejtu, zbog bildanja za produkciju, ahead of time compiler ocekuje
  // da takvi fieldovi-properiji budu PUBLIC
  constructor(public auth: AuthService) {  }

  logout() {
    this.auth.logout();
  }

}
