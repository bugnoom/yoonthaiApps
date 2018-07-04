import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Events } from 'ionic-angular';
import { Network } from '@ionic-native/network';

export enum ConnectionStatusEnum{
  Online,
  Offline
}

@Injectable()
export class NetworkcheckProvider {

  previousStatus;

  constructor(public alertCtrl : AlertController, public network : Network, public eventCtrl : Events ) {
    console.log('Hello NetworkcheckProvider Provider');
    this.previousStatus = ConnectionStatusEnum.Online;
  }

  public initializeNetworkEvents():void{
  
    this.network.onDisconnect().subscribe(
      () => {
        console.log("Connect is : Offline");
        if(this.previousStatus == ConnectionStatusEnum.Online){
          this.eventCtrl.publish('network:offline');
        }
        this.previousStatus = ConnectionStatusEnum.Offline;
      });

      this.network.onConnect().subscribe(
        () =>{
          console.log("Connect is : Online");
          if(this.previousStatus === ConnectionStatusEnum.Offline){
            this.eventCtrl.publish('network:online');
          }
          this.previousStatus = ConnectionStatusEnum.Online;
        });
  }

}
