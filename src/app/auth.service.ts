import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  // user: firebase.User; // kad koristis firebase, ne radis ovako jer se moras unsubscribati
  // po dogovoru observable objekt ima sufix $
  user$: Observable<firebase.User>; // ako si picajzla napravis svoj objekt i pomapiras samo atirbute
  // od usera koje bi da saljes u komponentu

  constructor(private afAuth: AngularFireAuth) {
    // afAuth.authState.subscribe(user => {
    //   console.log(user);
    //   this.user$ = user;
    // });
    this.user$ = afAuth.authState; // radis ovako, pa u html-u moras koristiti pipe async
    // radis ovako jer kad koristis firebase, moras se unsubscribati, kosristenjem pipea async
    // to će see automatskin napraviti kada se konponenta "unisti", kad koristis http modul ne trebas ovo raditi jer se on sam unsubscriba
  }

  login() {
    // tu je ok da imas "new", jer ako nekada imao unit test, mokat ces servis..
    // jer ces unit test raditi za komponente a ne servise
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    // localStorage.removeItem('firebase:authUser:....');
    // ocito trebas i serveru javiti da se zelis odlogirati a ne samo u aplikaciji maknuti token?
    this.afAuth.auth.signOut();
  }
}
