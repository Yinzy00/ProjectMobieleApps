import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
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
    private loadingService: LoadingService
    ) {

  }
  public devices: OnOffDevice[] = [];
  // public loading: boolean = true;
  public newDashboard = new Dashboard();
  async ngOnInit() {
    let loading = await this.loadingService.presentLoadingWithOptions('Getting devices');
    this.devices = await this.hubitatApiService.getOnOffDevices();
    for (let i = 0; i < this.devices.length; i++) {
      this.devices[i][i] = false;
    }
    loading.dismiss();
  }


  private close(): void {
    this.modalController.dismiss();
  }
  public Save():void{
    for (let i = 0; i < this.devices.length; i++) {
      if(this.devices[i][i])
      this.newDashboard.addDevice(this.devices[i]);
    }
    this.dbService.createDashboard(this.newDashboard);
    this.close();
  }
}
