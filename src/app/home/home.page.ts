import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Dashboard } from 'src/types/dashboard';
import { Device } from 'src/types/device';
import { OnOffDevice } from 'src/types/deviceTypes/onOffDevice';
import { AuthenticationService } from '../services/authentication.service';
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
    private authService: AuthenticationService,
    private route: Router,
    private modalController: ModalController,
    private hubitatApiService: HubitatApiService,
    private dbService: DatabaseService,
    private loadingService: LoadingService,
  ) { }
  async ngOnInit(): Promise<void> {
    let loading = await this.loadingService.presentLoadingWithOptions('Loading dashboards');
    await this.loadDashboards();
    loading.dismiss();
    console.log(this.dashboards);
  }

  async loadDashboards() {
    this.dashboards = await this.dbService.getDashboards();
  }
  dashboards: Dashboard[] = [];

  public async showCreateModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: CreateComponent
    });
    await modal.present();
    await modal.onDidDismiss().then(async value => {
      await this.loadDashboards();
    });
  }
  public async delete(dashboard): Promise<void> {
    await this.dbService.deleteDashboardById(dashboard.Id);
    await this.loadDashboards();
  }
  public detail(dashboard): void {

  }
}
