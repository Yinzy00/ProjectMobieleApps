import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Dashboard } from 'src/types/dashboard';
import { Device } from 'src/types/device';
import { OnOffDevice } from 'src/types/deviceTypes/onOffDevice';
import { AuthenticationService } from '../services/authentication.service';
import { DashboardService } from '../services/dashboard.service';
import { DatabaseService } from '../services/database.service';
import { HubitatApiService } from '../services/hubitat-api.service';
import { LoadingService } from '../services/loading.service';
import { CreateComponent } from './create/create.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    public authService: AuthenticationService,
    public route: Router,
  ) { }
  async ngOnInit(): Promise<void> {
    // let loading = await this.loadingService.presentLoadingWithOptions('Loading dashboards');
    // await this.loadDashboards();
    // loading.dismiss();
    // console.log(this.dashboards);
  }

}
