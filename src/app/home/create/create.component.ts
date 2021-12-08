import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DatabaseService } from 'src/app/services/database.service';
import { HubitatApiService } from 'src/app/services/hubitat-api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Dashboard } from 'src/types/dashboard';
import { OnOffDevice } from 'src/types/deviceTypes/onOffDevice';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {

  constructor(
    private modalController: ModalController,
    private hubitatApiService: HubitatApiService,
    private dbService: DatabaseService,
    private loadingService: LoadingService,
    private dashboardService: DashboardService
  ) {

  }
  isNew: boolean = true;
  id: string;
  public devices: OnOffDevice[] = [];
  // public loading: boolean = true;
  public dashboard = new Dashboard();
  async ngOnInit() {
    if (this.id != null) {
      console.log();
      Object.assign(this.dashboard, await this.dashboardService.getDashboardById(this.id));
      this.isNew = (this.id == null);
    }
    console.log(this.isNew);
    let loading = await this.loadingService.presentLoadingWithOptions('Getting devices');
    this.devices = await this.hubitatApiService.getOnOffDevices();
    for (let i = 0; i < this.devices.length; i++) {
      if (this.dashboard != null) {
        if (this.dashboard.Devices.filter(d => d.id == this.devices[i].id).length > 0) {
          this.devices[i][i] = true;
        }
        else {
          this.devices[i][i] = false;
        }
      }
    }
    loading.dismiss();
  }


  private close(): void {
    this.modalController.dismiss();
  }
  public Save(): void {
    this.dashboard.Devices = [];
    for (let i = 0; i < this.devices.length; i++) {
      if (this.devices[i][i])
        this.dashboard.addDevice(this.devices[i]);
    }
    console.log(this.isNew);
    if (this.isNew) {
      this.dbService.createDashboard(this.dashboard);
    }
    else {
      console.log("updated");
      this.dbService.UpdateDashboard(this.dashboard);
    }
    this.close();
  }
}
