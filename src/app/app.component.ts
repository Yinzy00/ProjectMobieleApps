import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Router } from '@angular/router';
import { Network } from '@capacitor/network';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from './services/authentication.service';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  
  public hasInternet:boolean = false;

  constructor(
    public authService: AuthenticationService, 
    public route: Router, 
    public menu: MenuController,
    public fireBaseApp: FirebaseApp
    ) {
  }
  async ngOnInit(): Promise<void> {
    if ((await Network.getStatus()).connected)
      this.hasInternet = true;
    else
      this.hasInternet = false;
  }

  public  logOut(){
    this.authService.signOut()
    this.route.navigate(['home']);
  }
}
