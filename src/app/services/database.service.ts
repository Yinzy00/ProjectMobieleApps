import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { Firestore, collection, CollectionReference, doc, DocumentReference, addDoc, getDocs, query, deleteDoc, updateDoc, where } from '@angular/fire/firestore';
import { Dashboard } from 'src/types/dashboard';
import { HubitatSetting, Setting, settingType } from 'src/types/settings';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private authService: AuthenticationService, private fireStore: Firestore) { }

  private getCollectionRef<T>(colName: string): CollectionReference<T> {
    return collection(this.fireStore, colName) as CollectionReference<T>;
  }

  private getDocumentRef<T>(colName: string, id: string): DocumentReference<T> {
    return doc(this.fireStore, `${colName}/${id}`) as DocumentReference<T>;
  }

  public async createDashboard(dashboard: Dashboard): Promise<void> {
    dashboard.UserId = this.authService.getCurUserId();
    await addDoc(this.getCollectionRef<Dashboard>('Dashboards'), Object.assign({}, dashboard));
  }

  public async getDashboards(): Promise<Dashboard[]> {
    if (this.authService.isSignedIn()) {
      const results = await getDocs<Dashboard>(
        query<Dashboard>(this.getCollectionRef('Dashboards'), where("UserId", "==", this.authService.getCurUserId()))
      );
      let returnValue: Dashboard[] = [];
      results.forEach(doc => {
        let dashboard = doc.data();
        dashboard.Id = doc.id;
        returnValue.push(dashboard);
      });
      return returnValue;
    }
    return null;
  }
  public async deleteDashboardById(dashboardId: string): Promise<void> {
    let ref = this.getDocumentRef<Dashboard>('Dashboards', dashboardId);
    await deleteDoc(ref);
  }

  public async updateDashboard(dashboard: Dashboard) {
    let ref = this.getDocumentRef<Dashboard>('Dashboards', dashboard.Id);
    console.log(dashboard);
    await updateDoc<Dashboard>(ref, { Id: dashboard.Id, Devices: dashboard.Devices, Title: dashboard.Title, UserId: dashboard.UserId });
  }
  public async createSetting<T extends Setting>(setting : T): Promise<void>{
    setting.userId = this.authService.getCurUserId();
    await addDoc(this.getCollectionRef<T>('Settings'), Object.assign({}, setting));
  }
  public async getSettings(): Promise<Setting[]> {
    if (this.authService.isSignedIn()) {
      const results = await getDocs<Setting>(
        query<Setting>(this.getCollectionRef('Settings'), where("userId", "==", this.authService.getCurUserId()))
      );
      let returnValue: Setting[] = [];
      results.forEach(doc => {
        let setting = doc.data();
        setting.id = doc.id;
        returnValue.push(setting);
      });
      return returnValue;
    }
    return null;
  }
  public async deleteSettingById(settingId: string): Promise<void>{
    let ref = this.getDocumentRef<Dashboard>('Settings', settingId);
    await deleteDoc(ref);
  }
  public async updateSetting<T extends Setting>(setting: T) {
    console.log(setting);
    switch (setting.type) {
      case settingType.Hubitat:
        let ref = this.getDocumentRef<HubitatSetting>('Settings', setting.id);
        await updateDoc<HubitatSetting>(ref, {id: setting.id, title: setting.title, type: setting.type, userId: setting.userId});
        break;
      default:
        break;
    }
  }
}
