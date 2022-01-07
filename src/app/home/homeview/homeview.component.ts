import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Network } from '@capacitor/network';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DatabaseService } from 'src/app/services/database.service';
import { HubitatApiService } from 'src/app/services/hubitat-api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Dashboard } from 'src/types/dashboard';

@Component({
  selector: 'app-homeview',
  templateUrl: './homeview.component.html',
  styleUrls: ['./homeview.component.scss'],
})
export class HomeviewComponent implements OnInit {

  public hasInternet: boolean;

  constructor(
    public  authService: AuthenticationService,
    public  route: Router,
    private modalController: ModalController,
    private hubitatApiService: HubitatApiService,
    private dbService: DatabaseService,
    private loadingService: LoadingService,
    private dashboardService: DashboardService
  ) { }

  async ngOnInit(): Promise<void> {    
    if ((await Network.getStatus()).connected)
      this.hasInternet = true;
    else
      this.hasInternet = false;

    let loading = await this.loadingService.presentLoadingWithOptions('Loading dashboards');
    await this.loadDashboards();
    loading.dismiss();
    console.log(this.dashboards);
  }

  private async loadDashboards() {
    if(this.hasInternet){
      //Load from firebase database
      await this.dashboardService.LoadDashboards().then(data=>{
        this.dashboards = this.dashboardService.dashboards;
    });
    }
    else{
      //Load from file system
      
    }
  }
  dashboards: Dashboard[] = [];

  public async showCreateModal(id=null): Promise<void> {
    const modal = await this.dashboardService.CreateAndUpdateDashboardModal(id);

    await modal.present();
    modal.onDidDismiss().then(async value => {
      await this.loadDashboards();
    });
  }
  public async delete(dashboard): Promise<void> {
    await this.dbService.deleteDashboardById(dashboard.Id);
    await this.loadDashboards();
  }
  public async detail(dashboard): Promise<void> {
    await this.showCreateModal(dashboard.Id);
  }
}
