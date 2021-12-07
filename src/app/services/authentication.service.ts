import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from '@firebase/auth';
import { promise } from 'selenium-webdriver';
import {FirebaseAuthentication} from '@robingenz/capacitor-firebase-authentication';

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
    const {credential: {idToken, accessToken}} = await FirebaseAuthentication.signInWithGoogle();
  }

  public async signOut(): Promise<void>{
    await FirebaseAuthentication.signOut();
  }

  private async setCurUser(user: User) {
    this.curUser = user;
  }
}
