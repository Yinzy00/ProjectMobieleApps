import { Capability, Device, DeviceAttribute } from "../device";
export class OnOffDevice implements Device {
    constructor() {

    }

    capabilities: (string | Capability)[];
    commands: string[];
    id: string;
    name: string;
    label: string;
    type: string;
    attributes: DeviceAttribute[];
    public async SendCommand(url): Promise<void>{
        let resp = await fetch(url, {
            method:'GET'
        });
    }
    public isOn(): boolean {
        return this.attributes.find(a => a.name == "switch").currentValue == "on";
    }
}