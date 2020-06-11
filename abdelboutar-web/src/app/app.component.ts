import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'abdelboutar-web';
  isHome = false;

  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe((val) => {
      this.isHome = this.location.isCurrentPathEqualTo('/');
    });
  }
}
