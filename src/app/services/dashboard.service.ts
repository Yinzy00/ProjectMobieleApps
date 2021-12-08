import { Injectable } from '@angular/core';
import { Dashboard } from 'src/types/dashboard';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private database : DatabaseService
  ) { }
  public dashboards: Dashboard[];
  public async LoadDashboards():Promise<void>{
    this.dashboards = await this.database.getDashboards();
  }
  public async getDashboardById(id){
    if(this.dashboards==null)
      await this.LoadDashboards();

    return this.dashboards.find(d=>d.Id == id);
    
  }
}
