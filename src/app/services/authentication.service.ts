import { Injectable } from '@angular/core';
import { Auth, signInWithCredential } from '@angular/fire/auth';
import {GoogleAuthProvider, signOut, User} from 'firebase/auth';
import { Router } from '@angular/router';
import { promise } from 'selenium-webdriver';
import {FirebaseAuthentication} from '@robingenz/capacitor-firebase-authentication';
import { Capacitor, CapacitorGlobal } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private curUser: null | User = null;
  private verId : string;

  constructor(public auth:Auth, public router: Router) { 
    this.auth.onAuthStateChanged(u=>this.setCurUser(u));
  }

  public isSignedIn() : boolean{
    return this.curUser !== null;
  }

  public getCurUserEmail() : string | undefined{
    return this.curUser ? this.curUser.email : undefined;
  }

  public getCurUserId() : string | undefined{
    return this.curUser ? this.curUser.uid : undefined;
  }

  public getDisplayName() : string |undefined{
    return this.curUser ? this.curUser.displayName : undefined;
  }

  public getProfilePicture() : string{
    return this.curUser ? this.curUser.photoURL : '/assets/pf_placeholder.png';
  }

  public async signInWithGoogle() : Promise<void>{
    let resp = await FirebaseAuthentication.signInWithGoogle();
    const {credential: {idToken, accessToken}} = resp;
    const {user} = resp;
    
    if (Capacitor.isNativePlatform()) {
      const credential = GoogleAuthProvider.credential(idToken, accessToken);
      await signInWithCredential(this.auth, credential);
    }
  }

  public async signOut(): Promise<void>{
    await FirebaseAuthentication.signOut();

    if (Capacitor.isNativePlatform()) {
      await signOut(this.auth);
    }
  }

  private async setCurUser(user: User) {
    this.curUser = user;
  }
}
