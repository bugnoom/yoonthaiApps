import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Globalization } from '@ionic-native/globalization';
import { I18nSwitcherProvider } from './../../providers/i18n-switcher/i18n-switcher';

import { DbProvider } from './../../providers/db/db';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';

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

  data: any = [];
  data_recomment: any = [];
  feature_image: any = [];
  category: any = [];
  curlat: any = 0;
  curlng: any = 0;
  diff: string = '0';
  imgfeature: any = {};
  page: number = 1;

  mylang: string;
  sociallink : any = [];

  cateicon : any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DbProvider, private mylocation: Geolocation, private launchnavigator: LaunchNavigator, private I18nSwitcherProvider: I18nSwitcherProvider, private globalization: Globalization, private storage: Storage, private inb : InAppBrowser) {
    
  }

  ionViewDidLoad() {
    /*  this.load_recomment();
     this.load_data(); */
     this.storage.get('mylang').then(
      (data) => {
        this.db.language = data;
        this.load_recomment();
        this.load_data();
      },
      (err) => { }
    )
  }

  opencategory(id) {
    this.navCtrl.push('CategoryPage', { ids: id });
  }

  ionViewDidEnter() {
    let watch = this.mylocation.watchPosition();
    watch.subscribe((data) => {
      this.curlat = data.coords.latitude;
      this.curlng = data.coords.longitude;
      // this.initFunction(data.coords.latitude, data.coords.longitude);
    });
  }

  load_recomment() {
    this.db.showloading();
    this.db.getPostbyCategory(132, this.page, this.db.language).then(
      data => {
        this.data_recomment = data;
        for (let i = 0; i < this.data_recomment.length; i++) {
          this.getimagefeature(this.data_recomment[i].featured_media, this.data_recomment[i].id);
          // console.log("Recomment id", this.data_recomment[i].id);
        }
      },
      err => { console.log('error', err) }
    )
  }

  load_data() {
    console.log("data lang", this.db.language)
    this.db.getdatainhomepage(this.db.language).then(
      alldata => {
        console.log("data cate",alldata);
        this.category = alldata;
        for (let i = 0; i < this.category.length; i++) {
          let slugname = this.category[i].slug.split('-');
          console.log('slugname',slugname[0]);
          this.cateicon[this.category[i].slug] = "assets/imgs/"+slugname[0].trim()+".png";
          for (let a = 0; a < this.category[i].data.length; a++) {
            this.getimagefeature(this.category[i].data[a].featured_media, this.category[i].data[a].id);
            // console.log('data',alldata[i].data[a]);
          }
        }
        this.db.hideloading();
      }
    )

  }

  loadsocial(){
    this.db.getsocialLink(this.db.language).then(
      socialdata =>{
        this.sociallink = socialdata
      }
    )
  }


  openweb(link){
    let url = "";
    switch(link){
      case "webboard":
      url = 'http://www.yoonthai.com/'+this.db.language+'/topics';
      this.inb.create(url,"_blank","location=no");
        // this.navCtrl.push('WebboardPage')
      break;
      case "facebook":
       url = "https://www.facebook.com/youinthai";
      this.inb.create(url,"_blank","location=no");
      break;
      case "instragram":
      url = "https://www.instagram.com/yoointhai/"
      this.inb.create(url,"_blank","location=no");
      break;
      case "youtube":
      url ="https://www.youtube.com/channel/UCnPZS16z_g5SiyupCqiR8ag"
      this.inb.create(url,"_blank","location=no");
      break;
    }
    
  }

  openmap(destlat, destlng) {
    let source: any = [this.curlat, this.curlng];
    let options: LaunchNavigatorOptions = {
      start: source
    };
    // console.log(options);
    let dest = [destlat, destlng]
    this.launchnavigator.navigate(dest, options).then(
      success => { console.log("Luanched"); this.db.hideloading() },
      error => { console.log("error nav lunch"); this.db.hideloading() }
    )
  }

  getdistanct(destlat, destlng) {
    return this.diff = this.db.getDistanceFromLatLonInKm(this.curlat, this.curlng, destlat, destlng).toFixed(2) + "km";
  }

  opendetail(data, fea) {
    let lat_lng = { lat: this.curlat, lng: this.curlng }
    this.navCtrl.push('DetailPage', { detaildata: data, featureImage: fea, lat_lng: lat_lng });
  }

  getimagefeature(feature_id, post_id) {
    this.db.getmedia_picture(feature_id).then(
      datas => {
        this.imgfeature = datas;
        if (!datas) {
          this.feature_image[post_id] = "";
        } else {
          this.feature_image[post_id] = this.imgfeature.source_url;
          // console.log(datas);
        }
      },
      err => { console.log("eerr", err) },
    )
  }



}
