import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {NameCodePair} from "../model/name-code-pair";
import {EsResponse} from "../model/es-response";
import {AUTH, ES_RES_STATUS_OK} from "../model/constants";
import {Store} from "../model/Store";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
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
}
