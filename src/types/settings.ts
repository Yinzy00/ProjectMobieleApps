export class Setting{
    constructor(){

    }
    public id: string;
    public title: string = "";
    public type: settingType;
    public userId: string;
}

export class HubitatSetting  extends Setting{
    constructor(){
        super();
    }
    public ip:string = "";
    public apiKey:string = "";
    public appId:string = "";
}

export enum settingType{
    Hubitat
}