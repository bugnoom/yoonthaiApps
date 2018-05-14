import { DbProvider } from './../../providers/db/db';
import { TranslateService } from '@ngx-translate/core';
import { Geolocation } from '@ionic-native/geolocation';
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

  data : any 
  grid: Array<Array<string>>;
  clat: any;
  clong : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private statusBar : StatusBar,private geolocation : Geolocation, public translate : TranslateService, private db : DbProvider, private storage : Storage) {

    this.data = [{
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
    }];

    this.getcurrentposition();
    
    //this.showdata();
  }

  getcurrentposition(){
  this.storage.get('current_lat').then((val)=>{this.clat = val;console.log("lat from storage :",val)});
  this.storage.get('current_lng').then((val)=>{this.clong = val;console.log("lng from storage :",val)});
  
  }

  ionViewDidLoad() {
   this.getcurrentposition();
    console.log('ionViewDidLoad HomePage');
   
  }

  ionViewDidEnter(){
  this.getcurrentposition();
  }

  getItems(ev: any) {
    console.log(ev);
  }

  showdata() {
    this.grid = Array(Math.ceil(this.data.length / 2))
    console.log(this.grid);
    let rowNum = 0;
    for (let i = 0; i < this.data.length; i += 2) {
      this.grid[rowNum] = Array(2);

      if (this.data[i]) {
        this.grid[rowNum][0] = this.data[i]
      }

      if (this.data[i + 1]) {
        this.grid[rowNum][1] = this.data[i + 1];
      }
      rowNum++;
    }
  }

}
