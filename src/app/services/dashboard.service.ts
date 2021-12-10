import { Injectable } from '@angular/core';
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
    this.dashboards = await this.database.getDashboards();
  }
  public async getDashboardById(id) {
    if (this.dashboards == null)
      await this.LoadDashboards();

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
}
