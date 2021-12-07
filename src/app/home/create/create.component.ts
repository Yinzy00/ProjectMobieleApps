import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HubitatApiService } from 'src/app/services/hubitat-api.service';
import { Dashboard } from 'src/types/dashboard';
import { OnOffDevice } from 'src/types/deviceTypes/onOffDevice';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {

  constructor(private modalController: ModalController, private hubitatApiService: HubitatApiService) {

  }
  public devices: OnOffDevice[] = [];

  public newDashboard = new Dashboard();
  async ngOnInit() {
    this.devices = await this.hubitatApiService.getOnOffDevices();
    for (let i = 0; i < this.devices.length; i++) {
      this.devices[i][i] = false;
    }
  }
  private close(): void {
    this.modalController.dismiss();
  }
  public Save():void{
    for (let i = 0; i < this.devices.length; i++) {
      if(this.devices[i][i])
      this.newDashboard.addDevice(this.devices[i]);
    }
    console.log(this.newDashboard);
  }
}
