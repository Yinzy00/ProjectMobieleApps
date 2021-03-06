import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Network } from '@capacitor/network';
import { Dashboard } from 'src/types/dashboard';
import { OnOffDevice } from 'src/types/deviceTypes/onOffDevice';
import { HubitatSetting, settingType } from 'src/types/settings';
import { DashboardService } from '../services/dashboard.service';
import { HubitatApiService } from '../services/hubitat-api.service';
import { LoadingService } from '../services/loading.service';
import { SettingService } from '../services/setting.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  public hasInternet: boolean;
  public hubFound: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private hubitat: HubitatApiService,
    private dashboardService: DashboardService,
    private loadingService: LoadingService,
    private settingService: SettingService
  ) {
  }
  async ngOnInit() {
    if ((await Network.getStatus()).connected)
      this.hasInternet = true;
    else
      this.hasInternet = false;

    let id: string = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadDashboardData(id);
  }
  public dashboard: Dashboard;
  public  title: string;
  public  devices: OnOffDevice[] = [];

private async loadDashboardData(id): Promise<void>{
  let setting = (await this.settingService.getByType(settingType.Hubitat) as HubitatSetting);
  if(setting!=null){
    this.hubFound = true;
    this.devices = [];
    let loading = await this.loadingService.presentLoadingWithOptions('Loading dashboard');
    await this.dashboardService.LoadDashboards();
  
    var data = await this.dashboardService.getDashboardById(id);
    this.dashboard = data;
    this.title = this.dashboard.Title;
    if(this.hasInternet){
      for (let i = 0; i < this.dashboard.Devices.length; i++) {
        const d = this.dashboard.Devices[i];
        var _data = await this.hubitat.getDeviceById(d.id);
        let _d = new OnOffDevice();
        Object.assign(_d, _data);
        this.devices.push(_d);
        this.devices[i][i] = (_d.isOn() ? true : false);
      }
    }
    else{
      this.devices = this.dashboard.Devices;
    }
    loading.dismiss();
  }
  else{
    this.hubFound = false;
  }
  

  // this.dashboardService.getDashboardById(id).then(async data => {
  //   this.dashboard = data;
  //   this.title = this.dashboard.Title;
  //   for (let i = 0; i < this.dashboard.Devices.length; i++) {
  //     const d = this.dashboard.Devices[i];
  //     await this.hubitat.getDeviceById(d.id).then(data => {
  //       let _d = new OnOffDevice();
  //       Object.assign(_d, data);
  //       // console.log(_d);
  //       this.devices.push(_d);
  //       this.devices[i][i] = (_d.isOn() ? true : false)
  //     });
  //   }
  // });

  
  
  }

  public async switchDevice(index: number) {
    if (this.hasInternet) {
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
  }
  
  public  async Edit() {
    const modal = await this.dashboardService.CreateAndUpdateDashboardModal(this.dashboard.Id);

    await modal.present();
    modal.onDidDismiss().then(async value => {
      this.loadDashboardData(this.dashboard.Id);
    });
  }
}
