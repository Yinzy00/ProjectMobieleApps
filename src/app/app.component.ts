import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public authService: AuthenticationService, public route: Router) {}
  private logOut(){
    this.authService.signOut()
    this.route.navigate(['home']);
  }
}
