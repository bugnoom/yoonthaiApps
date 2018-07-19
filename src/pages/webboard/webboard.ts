import { Storage } from '@ionic/storage';

import { DbProvider } from './../../providers/db/db';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController, App } from 'ionic-angular';


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
  chklogin : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DbProvider, public actionsheetCtrl : ActionSheetController, public modal : ModalController, public storage : Storage, private app : App) {
  }

  loadTopic(){
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
  ionViewWillEnter(){
    this.loadTopic();
    }

  ionViewDidLoad() {
   // this.db.checklogin();
  //  console.log("check",this.db.logedin);
    
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
          this.authorname[rawdata.data[i].ID] = rawdata.author[rawdata.data[i].ID];
         }
         even.complete();    
       },error => {console.log("infinite error",error);}
     );
      
    }, 1000);
  }

  openadd(){
   // this.navCtrl.push('WebboardAddPage');
    //console.log("ADD PAGE CLICK")
    

    this.storage.get('data_login').then(
      detail => {
        console.log("data_login_storage ",detail);
        this.chklogin = detail;
        if(this.chklogin == null){
          this.app.getRootNav().getActiveChildNav().select(3); 
        }else{
          let newtopic = this.modal.create('WebboardAddPage',{author : this.chklogin.id },{ enableBackdropDismiss: false });
          newtopic.onDidDismiss(()=>{this.loadTopic()});
          newtopic.present();
        }
       // this.navCtrl.setRoot("ProfilePage",{profile : detail})
         
      },err =>{console.log("Errr",err)})

   
  }

}
