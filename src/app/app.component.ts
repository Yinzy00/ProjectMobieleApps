import { Component } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from './services/authentication.service';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public authService: AuthenticationService, 
    public route: Router, 
    public menu: MenuController,
    public fireBaseApp: FirebaseApp
    ) {
  }
  public  logOut(){
    this.authService.signOut()
    this.route.navigate(['home']);
  }
}
