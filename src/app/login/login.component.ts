import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth: AuthService, private route: ActivatedRoute) { }

  login() {
    // zbog google logiranja -redirektanja, ne mozes redirektati tu
    // kao sto si radio u primjerima za ucenje, nego spremas return url i radis
    // observable u AppComponent i od tuda redirektas
    localStorage.setItem('returnUrl', this.route.snapshot.queryParamMap.get('returnUrl') || '/');

    this.auth.login();
  }
}
