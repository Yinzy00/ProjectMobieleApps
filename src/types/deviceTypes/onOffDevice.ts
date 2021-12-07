import { Capability, Device, DeviceAttribute } from "../device";

export class OnOffDevice implements Device{
    constructor(){

    }
    capabilities: (string | Capability)[];
    commands: string[];
    id: string;
    name: string;
    label: string;
    type: string;
    attributes: DeviceAttribute[];
    public On():void{

    }
    public Off():void{

    }
}