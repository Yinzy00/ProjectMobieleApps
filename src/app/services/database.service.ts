import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { Firestore, collection, CollectionReference, doc, DocumentReference, addDoc, getDocs, query, deleteDoc } from '@angular/fire/firestore';
import { Dashboard } from 'src/types/dashboard';
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
    const results = await getDocs<Dashboard>(
      query<Dashboard>(this.getCollectionRef('Dashboards'))
    );
    let returnValue: Dashboard[] = [];
    results.forEach(doc => {
      let dashboard = doc.data();
      dashboard.Id = doc.id;
      returnValue.push(dashboard);
    });
    return returnValue;
    // return results.docs.map(doc=>doc.data());
  }
  public async deleteDashboardById(dashboardId: string): Promise<void> {
    let ref = this.getDocumentRef<Dashboard>('Dashboards', dashboardId);
    console.log(ref);
    await deleteDoc(ref);
  }
}
