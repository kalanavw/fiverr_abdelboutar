import {Component, Input, OnInit} from '@angular/core';
import {Store} from "../../model/Store";
import {AUTH} from "../../model/constants";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input('home') isHome: boolean;
  isLoged: boolean = false;

  constructor(private store: Store, private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authService.loginLogOutEmitter.subscribe((value: boolean) => {
      this.isLoged = this.store.getData(AUTH.token) !== null
    });
    console.log(this.store.getData(AUTH.token) !== null)
    this.isLoged = this.store.getData(AUTH.token) !== null
  }

  logout() {
    this.store.clearStore();
    this.authService.loginLogOutEmitter.emit(false);
  }
}
