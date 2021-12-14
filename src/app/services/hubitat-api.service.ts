import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Device } from 'src/types/device';
import { OnOffDevice } from 'src/types/deviceTypes/onOffDevice';
import { HubitatSetting, settingType } from 'src/types/settings';
import { SettingService } from './setting.service';

@Injectable({
  providedIn: 'root'
})
export class HubitatApiService {

  constructor(
    private httpClient: HttpClient,
    private settingService: SettingService
  ) { }

  public async getUrl(content): Promise<string> {
    console.log(this.settingService.getAll());
    let setting = (await this.settingService.getByType(settingType.Hubitat) as HubitatSetting);
    if (setting != null) {
      let url: string = `http://${setting.ip}/apps/api/${setting.appId}/${content}?access_token=${setting.apiKey}`;
      return url;
    }
    return null;
  }

  public async getCommandUrl(deviceId, command, parameter?): Promise<string> {
    return await this.getUrl(`devices/${deviceId}/${command}${parameter != null ? parameter : ''}`);
  }

  public async getDevices() {
    let returnValue = Array<Device>();
    return this.httpClient.get<Device[]>(await this.getUrl("devices")).toPromise();
    // .subscribe((res)=>{
    //   returnValue = res;
    // });
    // promise.then((data)=>{
    //   return data;
    // });
    // return returnValue;
  }


  public async getDeviceById(id) {
    console.log("GET DEVICE " + id);
    return this.httpClient.get<Device>(await this.getUrl(`devices/${id}`)).toPromise();
  }

  public async getFullDevices() {
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

  public async getOnOffDevices() {

    var returnValue: OnOffDevice[] = [];
    var array = (await this.getFullDevices()).filter(d => d.commands.includes("on"));
    for (let i = 0; i < array.length; i++) {
      const device = array[i];
      returnValue.push((device as OnOffDevice));
    }
    return returnValue;
  }
}
