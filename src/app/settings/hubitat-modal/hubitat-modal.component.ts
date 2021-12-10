import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { SettingService } from 'src/app/services/setting.service';
import { HubitatSetting, Setting, settingType } from 'src/types/settings';

@Component({
  selector: 'app-hubitat-modal',
  templateUrl: './hubitat-modal.component.html',
  styleUrls: ['./hubitat-modal.component.scss'],
})
export class HubitatModalComponent implements OnInit {

  constructor(
    private modal: ModalController,
    private databaseService: DatabaseService,
    private settingService: SettingService
  ) { }
  public hubitatSetting = new HubitatSetting();
  public isNew: boolean = true;
  private id: string;
  async ngOnInit() {
    console.log(this.id);
    if (this.id != null) {
      Object.assign(this.hubitatSetting, await this.settingService.getSettingById(this.id));
      this.isNew = false;
    }
  }
  public save() {
    if (this.isNew) {
      this.hubitatSetting.type = settingType.Hubitat;
      this.databaseService.createSetting<HubitatSetting>(this.hubitatSetting);
    }
    else {
      this.hubitatSetting.type = settingType.Hubitat;
      this.databaseService.updateSetting<HubitatSetting>(this.hubitatSetting);
    }
    this.close();
  }
  public close() {
    this.modal.dismiss();
  }
}
