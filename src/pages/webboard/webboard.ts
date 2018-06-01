import { Storage } from '@ionic/storage';
import { DbProvider } from './../../providers/db/db';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the WebboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-webboard',
  templateUrl: 'webboard.html',
})
export class WebboardPage {

  page: number = 1;
  row: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DbProvider, private storage: Storage, public actionsheetCtrl : ActionSheetController, private translate : TranslateService) {
  }

  ionViewDidLoad() {
    this.db.checklogin();
    console.log("check",this.db.logedin);
    if (this.db.logedin) {
      this.db.showloading();
      this.db.getwebboard(this.page).then(
        data => {
          this.row = data;
          this.db.hideloading();
        },
        err => { console.log("error Webboard;");this.db.hideloading(); }
      )
    } else {
      this.actionsheetCtrl.create({
        title : this.translate.instant('text_check_login'),
        buttons :[
          {
            text : this.translate.instant('login'),
            handler : ()=>{
              this.navCtrl.push('LoginPage');
            }
          },
          {
            text: this.translate.instant('cancel'),
            role : "cancel",
            handler: ()=>{
              this.navCtrl.pop();
            }
          }
        ]
      }).present();
      
    }





  }

  openDetail(data) {
    this.navCtrl.push('WebboardDetailPage', { rowsdata: data })
  }

}
