import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Device } from 'src/types/device';
import { OnOffDevice } from 'src/types/deviceTypes/onOffDevice';
import { AuthenticationService } from '../services/authentication.service';
import { HubitatApiService } from '../services/hubitat-api.service';
import { CreateComponent } from './create/create.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
public test:string = 'test';
  constructor(public authService: AuthenticationService, public route: Router, public modalController: ModalController, public hubitatApiService: HubitatApiService) {}
  async ngOnInit(): Promise<void> {
    
  }


  devices: Array<Device>;

filter(array:Device[]):Array<Device>{
  return array.filter(x=>x.id=="101");
}

  public async showCreateModal():Promise<void>{
    const modal = await this.modalController.create({
      component: CreateComponent
    });
    await modal.present();
  }
}
