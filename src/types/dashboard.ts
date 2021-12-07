import { OnOffDevice } from "./deviceTypes/onOffDevice";

export class Dashboard{
    constructor(){

    }
    Title: string;
    Devices: OnOffDevice[] = new Array<OnOffDevice>();
    addDevice(device: OnOffDevice): void{
        this.Devices.push(device);
    }
}