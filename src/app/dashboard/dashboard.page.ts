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
    private loadingService : LoadingService
  ) {
   }
  async ngOnInit() {
    let id: string = this.activatedRoute.snapshot.paramMap.get('id');
    let loading = await this.loadingService.presentLoadingWithOptions('Loading dashboard');
    this.dashboardService.getDashboardById(id).then(data=>{
      this.dashboard = data;
      this.title = this.dashboard.Title;
      this.devices = this.dashboard.Devices;
    });
    loading.dismiss();
  }
  private dashboard: Dashboard;
  private title: string;
  private devices: OnOffDevice[];

  private switchDevice(device){
  console.log(device);
  }
  private Edit(){
    console.log("got to edit dashboard view");
  }
}
