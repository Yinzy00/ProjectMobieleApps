import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dashboard } from 'src/types/dashboard';
import { OnOffDevice } from 'src/types/deviceTypes/onOffDevice';
import { DashboardService } from '../services/dashboard.service';
import { HubitatApiService } from '../services/hubitat-api.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private hubitat: HubitatApiService,
    private dashboardService: DashboardService,
    private loadingService: LoadingService
  ) {
  }
  async ngOnInit() {
    let id: string = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadDashboardData(id);
  }
  public  dashboard: Dashboard;
  public  title: string;
  public  devices: OnOffDevice[] = [];

private async loadDashboardData(id): Promise<void>{
  this.devices = [];
  let loading = await this.loadingService.presentLoadingWithOptions('Loading dashboard');
  await this.dashboardService.LoadDashboards();
  this.dashboardService.getDashboardById(id).then(async data => {
    this.dashboard = data;
    this.title = this.dashboard.Title;
    for (let i = 0; i < this.dashboard.Devices.length; i++) {
      const d = this.dashboard.Devices[i];
      await this.hubitat.getDeviceById(d.id).then(data => {
        let _d = new OnOffDevice();
        Object.assign(_d, data);
        // console.log(_d);
        this.devices.push(_d);
        this.devices[i][i] = (_d.isOn() ? true : false)
      });
    }
  });
  loading.dismiss();
}

public  async switchDevice(index: number) {
    let deviceId = this.devices[index].id;
    //Update device state
    let device = new OnOffDevice();
    Object.assign(device, await this.hubitat.getDeviceById(deviceId));

    console.log(device.isOn());

    // //Check
    console.log(this.devices);
    if (!this.devices[index][index]) {
      console.log("Turning off");
      device.SendCommand(this.hubitat.getCommandUrl(device.id, "off"));
    }
    else {
      console.log("Turning on");
      device.SendCommand(this.hubitat.getCommandUrl(device.id, "on"));
    }

  }
  public  async Edit() {
    const modal = await this.dashboardService.CreateAndUpdateDashboardModal(this.dashboard.Id);

    await modal.present();
    modal.onDidDismiss().then(async value => {
      // await this.dashboardService.LoadDashboards();
      // this.dashboard = await this.dashboardService.getDashboardById(this.dashboard.Id);
      this.loadDashboardData(this.dashboard.Id);
      // this.devices = this.dashboard.Devices;
      // this.title = this.dashboard.Title;
    });
  }
}
