import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {ES_RES_STATUS_OK} from "../../model/constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup;

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    this.registerFormGroup = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    console.log(this.registerFormGroup.controls['firstName'].hasError('required'))
  }

  onRegister() {
    this.authService.onRegister(this.registerFormGroup.value).subscribe(value => {
      if(value.status === ES_RES_STATUS_OK){
        this.router.navigate(['login']);
      }else{
        alert(value.message);
      }
    });
  }
}
