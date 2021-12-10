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

  constructor(
    private settingService: SettingService,
    private authService: AuthenticationService,
    private db: DatabaseService
    ) { }
  private selectedType = settingType.Hubitat;
  public linkedDevices: Setting[];
  ngOnInit() {
    this.load();
  }
  public async load(){
    await this.settingService.loadSettings();
      if(this.settingService.getAll() != null){
        this.linkedDevices = await this.settingService.getAll();
      }
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
