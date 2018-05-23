import { DbProvider } from './../../providers/db/db';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from  '@ionic/storage';
/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  detaildata : any ;
  feature_img : any;
  data : any = [];
  position : any ; 
  cur_lng = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db : DbProvider, private storage : Storage) {
    this.detaildata = this.navParams.get('detaildata');
    this.feature_img = this.navParams.get('featureImage');
    this.position = this.navParams.get('lat_lng');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
   // this.getfeatureimage(this.detaildata.featured_media);
    console.log('fea',this.feature_img);
    console.log('latlng', this.position.lat, this.position.lng);
    this.data = {title : this.detaildata.title.rendered};
  }

  opendatetime(data){
    let opendate = "";
    let opentime = "";
    if(data.opendate == 0 && data.closedate == 0){
      opendate = "Every day";
    }else{
      opendate = data.opendate + ' - ' + data.closedate;
    }

    if(data.opentime == 0 && data.closetime == 0){
      opentime = "";
    }else{
      opentime = ' : ' + data.opentime + ' - ' + data.closetime;
    }

    return opendate +  opentime;
  }


}
