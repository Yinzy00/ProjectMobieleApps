import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Dashboard } from 'src/types/dashboard';
import { Device } from 'src/types/device';
import { OnOffDevice } from 'src/types/deviceTypes/onOffDevice';
import { AuthenticationService } from '../services/authentication.service';
import { DatabaseService } from '../services/database.service';
import { HubitatApiService } from '../services/hubitat-api.service';
import { CreateComponent } from './create/create.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public test: string = 'test';
  constructor(
    public authService: AuthenticationService,
    public route: Router,
    public modalController: ModalController,
    public hubitatApiService: HubitatApiService,
    public dbService: DatabaseService
  ) { }
  async ngOnInit(): Promise<void> {
    await this.loadDashboards();
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
}
