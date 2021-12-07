import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resolve } from 'dns';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Device } from 'src/types/device';
import { OnOffDevice } from 'src/types/deviceTypes/onOffDevice';

@Injectable({
  providedIn: 'root'
})
export class HubitatApiService {

  constructor(private httpClient: HttpClient) { }

  readonly apiAccesToken = "b8829a43-4c30-495f-b1a1-112d1254db86";
  readonly apiAppId = 33;

  getUrl(content) {
    return `http://192.168.0.209/apps/api/${this.apiAppId}/${content}?access_token=${this.apiAccesToken}`;
  }
  
  getDevices() {
    let returnValue = Array<Device>();
    return this.httpClient.get<Device[]>(this.getUrl("devices")).toPromise();
    // .subscribe((res)=>{
    //   returnValue = res;
    // });
    // promise.then((data)=>{
    //   return data;
    // });
    // return returnValue;
  }


  getDeviceById(id) {
    return this.httpClient.get<Device>(this.getUrl(`devices/${id}`)).toPromise();
  }

  async getFullDevices(){
    let returnValue = Array<Device>();
    (await this.getDevices()).forEach(async d=> {
      returnValue.push(await this.getDeviceById(d.id));
    });
    return returnValue;
  }

  async getOnOffDevices(){
    
    return (await this.getFullDevices()).filter(d=>d.commands.includes("on"));

  }
}
