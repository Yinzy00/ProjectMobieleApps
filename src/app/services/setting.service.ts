import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HubitatSetting, Setting, settingType } from 'src/types/settings';
import { HubitatModalComponent } from '../settings/hubitat-modal/hubitat-modal.component';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  constructor(
    private modalController: ModalController,
    private databaseService: DatabaseService
  ) { }


  private settings: Setting[];
  public async CreateAndUpdateSettingModal(type: settingType, id: string = null): Promise<HTMLIonModalElement> {
    switch (type) {
      case settingType.Hubitat:
        return await this.modalController.create({
          component: HubitatModalComponent,
          componentProps: {
            id: id
          }
        });
      default:
        break;
    }

  }

  public async loadSettings(): Promise<void> {
    this.settings = await this.databaseService.getSettings();
  }
  public async check(): Promise<void> {
    if (this.settings == null || this.settings.length == 0) {
      await this.loadSettings();
    }
  }
  public async getAll(): Promise<Setting[]> {
    await this.check();
    return this.settings;
  }
  public async getSettingById(id: string): Promise<Setting> {
    await this.check();
    return this.settings.find(s => s.id == id);
  }
  public async getByType(type: settingType): Promise<Setting> {
    await this.check();
    if(this.settings!=null){
      return this.settings.find(s => s.type == type);
    }
    else{
      return null;
    }
  }
}
