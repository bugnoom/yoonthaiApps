import { I18nSwitcherProvider } from './../../providers/i18n-switcher/i18n-switcher';

import { DbProvider } from './../../providers/db/db';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ActionSheetController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  userdetail : any;
  avatar : string;
  logedin: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage : Storage, private db : DbProvider,public event : Events,private actionsheet : ActionSheetController, private translate : TranslateService,private I18nSwitcherProvider: I18nSwitcherProvider) {
    this.userdetail = this.navParams.get('profile');
    this.logedin = this.db.logedin;
  }

  ionViewDidLoad() {
    
   
    this.avatar = this.userdetail.avatar_urls[96];
  }

  editprofile(id){

  }

  logout(){
    this.storage.remove('data_login');
    this.storage.remove('logedin');
    this.event.publish("user:login",'');
    this.logedin = false;
    this.db.logedin = false;
    this.navCtrl.setRoot('HomePage');
  }

  switch(lang: string) {
    this.I18nSwitcherProvider.switchLang(lang);
    this.db.language = lang;
    this.navCtrl.setRoot('HomePage');
    this.storage.set('mylang',lang);
  }

  opensetting() {
    this.actionsheet.create({
      title : this.translate.instant('txt_lang'),
      buttons :[
        {
          text : this.translate.instant('Th'),
          handler : ()=>{
            this.switch('th');
          }
        },
        {
          text : this.translate.instant('Ko'),
          handler : ()=>{
            this.switch('ko');
          }
        },
        {
          text: this.translate.instant('cancel'),
          role : "cancel",
          handler: ()=>{
            console.log('cancel actionsheet')
          }
        }
      ]
    }).present();
    //this.navCtrl.push('SettingPage');
  }


}
