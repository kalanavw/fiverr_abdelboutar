import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {NameCodePair} from "../../model/name-code-pair";
import {EsResponse} from "../../model/es-response";
import {AUTH, ES_RES_STATUS_OK} from "../../model/constants";
import {Store} from "../../model/Store";
import {AuthService, FacebookLoginProvider, GoogleLoginProvider} from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public loggedIn: any;
  public isFbLogin = false;

  constructor(private authService: AuthenticationService,
              private socialAuthService: AuthService,
              private router: Router,
              private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.socialAuthService.authState.subscribe((user: any) => {
      this.loggedIn = (user != null);
      if (user) {
        this.loginForm.patchValue({
          email: user.email,
          password: user.id
        });
        let newUser: any;
        if (this.isFbLogin) {
          newUser = {
            firstName: user.last_name,
            lastName: user.first_name,
            email: user.email,
            password: user.id
          }
        } else {
          newUser = {
            firstName: user.given_name,
            lastName: user.family_name,
            email: user.email,
            password: user.id
          }
        }
        this.authService.onRegister(newUser).subscribe(value => {
          if (value.status === ES_RES_STATUS_OK) {
            this.onLogin();
          }
        });

      }
    });
  }

  onLogin() {
    const params: NameCodePair[] = [
      new NameCodePair(0, 'username', this.loginForm.value.email),
      new NameCodePair(0, 'password', this.loginForm.value.password)
    ];
    this.authService.onLogin(params).subscribe((res: EsResponse) => {
      if (res.status === ES_RES_STATUS_OK) {
        const jwt = res.data.token;
        const jwtData = jwt.split('.')[1];
        const decodedJwtJsonData = window.atob(jwtData);
        const decodedJwtData: any = JSON.parse(decodedJwtJsonData);
        this.store.setData(AUTH.token, jwt);
        this.store.setData(AUTH.expiration, decodedJwtData.exp);
        this.store.setData(AUTH.username, decodedJwtData.sub);
        const roles: any[] = decodedJwtData.roles;
        let role = '';
        if (roles.length > 0) {
          roles.forEach(value => {
            role += value.authority.concat(',');
          });
        }
        this.store.setData(AUTH.roles, role);
        alert('login success');
        this.router.navigate(['']);
      } else {
        alert('Invalid credentials');
      }
    });
  }

  signInWithFB() {
    this.isFbLogin = true;
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}
