import { DbProvider } from './../../providers/db/db';
import { TranslateService } from '@ngx-translate/core';
import { StatusBar } from '@ionic-native/status-bar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from  '@ionic/storage';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  data : any = [];
  data_recomment : any =[];
  category : any = [];
  clat: any = 0;
  clong : any = 0;


  constructor(public navCtrl: NavController, public navParams: NavParams, private statusBar : StatusBar, public translate : TranslateService, private db : DbProvider, private storage : Storage) {

   /*  this.data = [{
      title : " test1test1test 1test1test1 test1t est1test1test1test1test1test1test1 test1test1",
      image : "https://github.com/ionic-team/ionic-preview-app/blob/master/src/assets/img/nin-live.png?raw=true",
      except : "This is Except content contentcontentcontent style=hite-space: pre-line;e=hite-space: pre-line;e=hite-space: pre-line;",
      lat : 13.735679,
      lng : 100.5768613,
    },{
      title : " test1test1test 1test1test1 test1t est1test1test1test1test1test1test1 test1test1",
      image : "https://github.com/ionic-team/ionic-preview-app/blob/master/src/assets/img/nin-live.png?raw=true",
      except : "This is Except content contentcontentcontent style=hite-space: pre-line;e=hite-space: pre-line;e=hite-space: pre-line;",
      lat : 13.735679,
      lng : 100.5768613,
    },{
      title : " test1test1test 1test1test1 test1t est1test1test1test1test1test1test1 test1test1",
      image : "https://github.com/ionic-team/ionic-preview-app/blob/master/src/assets/img/nin-live.png?raw=true",
      except : "This is Except content contentcontentcontent style=hite-space: pre-line;e=hite-space: pre-line;e=hite-space: pre-line;",
      lat : 13.735679,
      lng : 100.5768613,
    },{
      title : " test1test1test 1test1test1 test1t est1test1test1test1test1test1test1 test1test1",
      image : "https://github.com/ionic-team/ionic-preview-app/blob/master/src/assets/img/nin-live.png?raw=true",
      except : "This is Except content contentcontentcontent style=hite-space: pre-line;e=hite-space: pre-line;e=hite-space: pre-line;",
      lat : 13.735679,
      lng : 100.5768613,
    }]; */

    this.db.getParentCategories().subscribe(
      data => {this.category = data},
      err => {console.log(err)},
      () => {}
    )

    // id 132 is recommend category id
    this.db.getPostbyCategory(132).subscribe(
      data => {this.data_recomment = data},
      err => {console.log("get Recommend",err)},
      () => {}
    )

  }

  getpost(cate){
    this.db.getPostbyCategory(cate).subscribe(
      data => {this.data},
      err =>{console.log("Err on post by category",err)},
      () => {}
    )
  }
  
  ionViewDidLoad() {
  
  }

  ionViewDidEnter(){
    
  }

}
