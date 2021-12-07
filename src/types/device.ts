export interface Device{
    
    // id: string;
    // name: string;
    // label: string;
    // type: string;
    // attributes: DeviceAttribute[];
    id:           string;
    name:         string;
    label:        string;
    type:         string;
    attributes:   DeviceAttribute[];
    capabilities: Array<Capability | string>;
    commands:     string[];
}

export interface DeviceAttribute {
    //  name:string;
    //  currentValue:string;
    //  dataType:string;
    //  values:string[];
    //  commands: string[];
    name: string;
    currentValue: number | null | string;
    dataType: string;
    values?: string[];
}
export interface Capability {
    attributes: CapabilityAttribute[];
}

export interface CapabilityAttribute {
    name:     string;
    dataType: null;
}