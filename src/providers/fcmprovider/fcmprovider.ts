import { HttpClient } from '@angular/common/http';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class FcmproviderProvider {

  constructor(public firebaseNative : Firebase, public http : HttpClient, private platform : Platform) {
    console.log('Hello FcmproviderProvider Provider');
  }

  //get Premission from the user
  async getToken(){
    let token;
    if(this.platform.is('android')){
      token = await this.firebaseNative.getToken();
    }

    if(this.platform.is('ios')){
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }

    console.log("Save Token :" + token);

    return this.SaveTokenToDB(token);
  }

  //save the token to Database by userid
  private SaveTokenToDB(token){
    if(!token) return;

    const deviceRef = this.platform.platforms(); //return array of the current platforms
    //Save data to Wordpress
    console.log('Platform is :' + deviceRef);
    console.log("Save Token :" + token);
  }

  // Listen to incoming FCM Message
  listenToNotifications(){
    return this.firebaseNative.onNotificationOpen();
  }

}
