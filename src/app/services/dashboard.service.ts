import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Network } from '@capacitor/network';
import { ModalController } from '@ionic/angular';
import { Dashboard } from 'src/types/dashboard';
import { CreateComponent } from '../home/create/create.component';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private database: DatabaseService,
    private modalController: ModalController,
  ) { }
  public dashboards: Dashboard[];
  public async LoadDashboards(): Promise<void> {
    if ((await Network.getStatus()).connected){
      //Load from db
      this.dashboards = await this.database.getDashboards();

      let offlineData = await this.GetDashboardsFromFileSystem();

      if(offlineData!=this.dashboards){
        this.SaveDashboardsToFileSystem();
      }

    }
    else {
      //Load from filesystem
      this.dashboards = await this.GetDashboardsFromFileSystem()
    }
  }
  public async getDashboardById(id) {
    if (this.dashboards == null){
      await this.LoadDashboards();
    }
    return this.dashboards.find(d => d.Id == id);
  }
  public async CreateAndUpdateDashboardModal(id = null): Promise<HTMLIonModalElement> {
    return await this.modalController.create({
      component: CreateComponent,
      componentProps: {
        id: id
      }
    });
  }


  public async SaveDashboardsToFileSystem() {
    const savedFile = await Filesystem.writeFile({
      path: "dashboards",
      data: JSON.stringify(this.dashboards),
      directory: Directory.Data,
      encoding: Encoding.UTF8
    });
  }

  public async GetDashboardsFromFileSystem(): Promise<Dashboard[]> {
    try {
      const fileContent = await Filesystem.readFile({
        path: "dashboards",
        directory: Directory.Data,
        encoding: Encoding.UTF8
      });
      return JSON.parse(fileContent.data);
    } catch (error) {
      return new Array<Dashboard>();
    }
  }

}
