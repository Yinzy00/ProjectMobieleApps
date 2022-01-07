import { Component, OnInit } from '@angular/core';
import { Setting, settingType } from 'src/types/settings';
import { AuthenticationService } from '../services/authentication.service';
import { DatabaseService } from '../services/database.service';
import { SettingService } from '../services/setting.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

public Addable : boolean;
private selectedType = settingType.Hubitat;
  public linkedDevices: Setting[];

  constructor(
    private settingService: SettingService,
    private authService: AuthenticationService,
    private db: DatabaseService
  ) { }
  
  async ngOnInit() {
    await this.load();
  }

  public check(){
    if (this.linkedDevices.length > 0)
      this.Addable = false;
    else
      this.Addable = true;
  }

  public async load(){
    await this.settingService.loadSettings();
      if(this.settingService.getAll() != null){
        this.linkedDevices = await this.settingService.getAll();
      }
      this.check();
  }
  public async add(): Promise<void> {
    let modal = await this.settingService.CreateAndUpdateSettingModal(this.selectedType);
    modal.present();
    modal.onDidDismiss().then(async () => {
      await this.load();
    });
  }
  public async delete(settingId):Promise<void>{
    this.db.deleteSettingById(settingId);
    await this.load();
  }
  public async edit(setting: Setting): Promise<void>{
    let modal = await this.settingService.CreateAndUpdateSettingModal(setting.type, setting.id);
    modal.present();
    modal.onDidDismiss().then(async ()=>{
      await this.load();
    });
  }
}
