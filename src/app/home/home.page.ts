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
    this.devices = await this.hubitatApiService.getFullDevices();
    // let dp = await this.hubitatApiService.getDevices().toPromise();
    // this.devices = this.hubitatApiService.getOnOffDevices();
    // let _w = [];
    // (await this.hubitatApiService.getDevices()).forEach(async d=>{
    //   let x =(await this.hubitatApiService.getDeviceById(d.id))
    //   console.log(x);
    // });
  // let array = Array<Device>();
  //   this.hubitatApiService.getFullDevices()
  //   .then((res)=>{
  //     console.log(res);
  //     // alert(res[0]);
  //     array = res;
  //   })
  //   .catch((err)=>console.log(err))
  //   .finally(()=>{
  //     // alert(array[0]);
  //     this.devices = array;
  //     console.log("done");
  //   });
    // this.hubitatApiService.getDevices().subscribe((res)=>{
    //   res.forEach(d=>{
    //     this.hubitatApiService.getDeviceById(d.id).subscribe((_res)=>{
    //       if(_res.commands.includes("on") && _res.commands.includes("off"))
    //       this.devices.push(_res as OnOffDevice);
    //       console.log(this.devices);
    //     })
    //   });
    // });
    // dp.forEach(x=>this.devices.push(dp));
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
