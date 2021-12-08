import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  getUrl(content): string {
    return `http://192.168.0.209/apps/api/${this.apiAppId}/${content}?access_token=${this.apiAccesToken}`;
  }

  getCommandUrl(deviceId, command, parameter?): string {
    return this.getUrl(`devices/${deviceId}/${command}${parameter != null ? parameter : ''}`);
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
    console.log("GET DEVICE " + id);
    return this.httpClient.get<Device>(this.getUrl(`devices/${id}`)).toPromise();
  }

  async getFullDevices() {
    let returnValue = Array<Device>();
    let devices = await this.getDevices();
    for (let i = 0; i < devices.length; i++) {
      const d = devices[i];
      returnValue.push(await this.getDeviceById(d.id));
    }
    // (await this.getDevices()).forEach(async d=> {
    //   returnValue.push(await this.getDeviceById(d.id));
    // });
    return returnValue;
  }

  async getOnOffDevices() {

    var returnValue: OnOffDevice[] = [];
    var array = (await this.getFullDevices()).filter(d => d.commands.includes("on"));
    for (let i = 0; i < array.length; i++) {
      const device = array[i];
      returnValue.push((device as OnOffDevice));
    }
    return returnValue;
  }
}
