import { Injectable } from '@angular/core';
import { Firestore, collection, CollectionReference, doc, DocumentReference, addDoc } from '@angular/fire/firestore';
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
    const _dashboard = Object.assign({ }, dashboard);
    await addDoc(this.getCollectionRef<Dashboard>('Dashboards'), _dashboard);
  }
}
