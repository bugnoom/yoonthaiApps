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
  authorname : any = [];
  hasMoreData: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DbProvider, public actionsheetCtrl : ActionSheetController) {
  }

  ionViewDidLoad() {
   // this.db.checklogin();
  //  console.log("check",this.db.logedin);
    this.db.showloading();
      this.db.getwebboard(this.page).then(
        data => {
          let rawdata : any = data;
          this.row = rawdata;
          for(let i = 0;i < this.row.data.length; i++){
            this.authorname[this.row.data[i].ID] = this.row.author[this.row.data[i].ID];
          }
          console.log("webboard row",this.row);
          console.log('augthorname',this.authorname);
          this.db.hideloading();
        },
        err => { console.log("error Webboard;");this.db.hideloading(); }
      )
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.ionViewDidLoad();
      refresher.complete();
    }, 1000);
  }

  openDetail(data) {
    this.navCtrl.push('WebboardDetailPage', { rowsdata: data, author : this.authorname[data.ID]})
  }

  doInfinite(even) {
    // console.log("infinite Scroll");
    this.page = this.page + 1;
    setTimeout(() => {
     this.db.getwebboard(this.page).then(
       data =>{
         let rawdata :any  = data;
         console.log("infinite data", rawdata.data.length);
        if(rawdata.data.length <= 0){this.hasMoreData = false;return false;}
         for(let i =0; i < rawdata.data.length; i++){
           let count = this.row.data.length;
          this.row.data[count] = rawdata.data[i];
          this.authorname[rawdata.data[i].ID] = rawdata.author[rawdata.data[i].ID].detail.nickname;
         }
         even.complete();    
       },error => {console.log("infinite error",error);}
     );
      
    }, 1000);
  }


}
