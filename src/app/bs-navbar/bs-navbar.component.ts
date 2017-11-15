import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BsNavbarComponent {

  // user: firebase.User; // kad koristis firebase, ne radis ovako jer se moras unsubscribati
  user$: Observable<firebase.User>; // po dogovoru observable objekt ima sufix $

  constructor(private afAuth: AngularFireAuth) {
    // afAuth.authState.subscribe(user => {
    //   console.log(user);
    //   this.user$ = user;
    // });

    this.user$ = afAuth.authState; // radis ovako, pa u html-u moras koristiti pipe async
    // radis ovako jer kad koristis firebase, moras se unsubscribati, kosristenjem pipea async
    // to se automatskin napravi, kad koristis http modul ne trebas ovo raditi jer se on sam unsubscriba
  }

  logout() {
    // localStorage.removeItem('firebase:authUser:....');
    // ocito trebas i serveru javiti da se zelis odlogirati a ne samo u aplikaciji maknuti token?
    this.afAuth.auth.signOut();
  }

}
