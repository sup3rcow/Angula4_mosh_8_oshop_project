import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(authService: AuthService, userService: UserService, router: Router) {

    // zbog logiranj - redirektanja na google
    // moras ovako navigirati na returnUrl, a ne kroz login.component.ts
    // primjer https://github.com/sup3rcow/Angula4_mosh_3part_authentication/blob/master/src/app/login/login.component.ts
    // POSTO APP.COMPONENT ZIVI STALNO, NE MORAS HENDLATI UNSUBCRIPTION OF FIREBASE AUTH SERVISA
    authService.user$.subscribe(user => {
      if (!user) {
        return;
      }
      // posto u ovoj aplikaciji nema registracije(tj aplikacije ne hendla uredjivanje korisnika),
      // moras kod svakog logiranj
      // napraviti update/save usera u svoju bazu, jer je mozda user mijenjao npr svoje ime
      userService.save(user);

      // redirekt dio
      let returnUrl = localStorage.getItem('returnUrl');
      if  (returnUrl) {
        localStorage.removeItem('returnUrl');
        router.navigate([returnUrl]); // [returnUrl || '/'] // ne ovako jer ce te redirektati ako nemas return url
      }
    });
  }
}
