import { Injectable } from '@angular/core';


import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  // user: firebase.User; // kad koristis firebase, ne radis ovako jer se moras unsubscribati
  // po dogovoru observable objekt ima sufix $
  user$: Observable<firebase.User>; // ako si picajzla napravis svoj objekt i pomapiras samo atirbute
  // od usera koje bi da saljes u komponentu

  constructor(private afAuth: AngularFireAuth, private userService: UserService, private route: ActivatedRoute, private router: Router) {
    // afAuth.authState.subscribe(user => {
    //   console.log(user);
    //   this.user$ = user;
    // });
    this.user$ = afAuth.authState; // radis ovako, pa u html-u moras koristiti pipe async
    // radis ovako jer kad koristis firebase, moras se unsubscribati, kosristenjem pipea async
    // to će see automatskin napraviti kada se konponenta "unisti", kad koristis http modul ne trebas ovo raditi jer se on sam unsubscriba
    // jos jedan od nacina da se unsubscribas je da implenetiras u klasi koja se subscriba
    // , OnDestroy inteface.. to prouci ako ti bude trebalo
  }

  login() {
    // zbog google logiranja -redirektanja, ne mozes redirektati tu
    // kao sto si radio u primjerima za ucenje, nego spremas return url i radis
    // observable u AppComponent i od tuda redirektas
    localStorage.setItem('returnUrl', this.route.snapshot.queryParamMap.get('returnUrl') || '/');

    // tu je ok da imas "new", jer ako nekada imao unit test, mokat ces servis..
    // jer ces unit test raditi za komponente a ne servise
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    // localStorage.removeItem('firebase:authUser:....');
    // ocito trebas i serveru javiti da se zelis odlogirati a ne samo u aplikaciji maknuti token?
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  // prebacuje Observable<firebase.User> u FirebaseObjectObservable<AppUser> ili Observable<null>
  // async pipe i appUser$, ne smijes zajedno koristiti, jer se stvori infinite loop
  // observable unutar observable-a, pa async pipe misli da se stalno dogadja neka promjena..
  get appUser$(): Observable<AppUser> {
    return this.user$.switchMap(user => {
      if (user) {
        return this.userService.get(user.uid);
      }
      return Observable.of(null);
    });
  }
}
