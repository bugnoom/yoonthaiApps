import { NetworkcheckProvider } from './../../providers/networkcheck/networkcheck';
import { Globalization } from '@ionic-native/globalization';
import { I18nSwitcherProvider } from './../../providers/i18n-switcher/i18n-switcher';

import { DbProvider } from './../../providers/db/db';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, App } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';



@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  data: any = [];
  data_recomment: any = [];
  feature_image: any = [];
  category: any = { alldata: "" };
  post_data: any = Array();
  curlat: any = 0;
  curlng: any = 0;
  diff: string = '0';
  imgfeature: any = {};
  page: number = 1;

  mylang: string;
  sociallink: any = [];

  cateicon: any = [];

  isloading: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: DbProvider, private mylocation: Geolocation, private launchnavigator: LaunchNavigator, private I18nSwitcherProvider: I18nSwitcherProvider, private globalization: Globalization, private storage: Storage, public event: Events, public networkcheck: NetworkcheckProvider, private app: App) {
    this.storage.get('mylang').then(
      (data) => {
        this.db.language = data;
        this.load_recomment();
        //this.load_data();
        this.testload();
      },
      (err) => { console.log("error on constructore get lang"+err) }
    )
  }

  ionViewDidLoad() {

    /*  this.load_recomment();
     this.load_data(); */

  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      //this.ionViewDidLoad();
      this.load_recomment();
      this.testload();
      refresher.complete();
    }, 1000);
  }

  opencategory(id) {
    this.navCtrl.push('CategoryPage', { ids: id })

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
    this.isloading = true;
    this.db.getWPPostbyCategory(132, 5, this.db.language).then(
      data => {
        this.data_recomment = data;
        console.log("data_recomment",this.data_recomment);
        for (let i = 0; i < this.data_recomment.length; i++) {
          //this.getimagefeature(this.data_recomment[i].featured_media, this.data_recomment[i].id);
           console.log("Recomment id "+i, this.data_recomment[i]);
           this.db.getmedia_picture(this.data_recomment[i].featured_media).then(
             feaimg =>{
                let fimg : any = feaimg;
                this.feature_image[this.data_recomment[i].id] = fimg.source_url
             },
             feaimg_err => {console.log("Error recomment",feaimg_err)}
           )
          
        }
      },
      err => { console.log('error', err); this.db.hideloading(); }
    )
  }

  testload() {
    //get category list from mobile service file
    this.db.getdatainhomepage(this.db.language).then(
      alldata => {
        this.category.alldata = alldata;
        for (let i = 0; i < this.category.alldata.length; i++) {
          let slugname = this.category.alldata[i].slug.split('-');
          console.log('slugname', slugname[0]);
          this.cateicon[this.category.alldata[i].slug] = "assets/imgs/" + slugname[0].trim() + ".png";

          //get post_data by category id
          this.db.getWPPostbyCategory(this.category.alldata[i].id, 5, this.db.language).then(
            post_data => {
              this.post_data[this.category.alldata[i].id] = post_data;
              console.log('post data ' + this.category.alldata[i].id, this.post_data[this.category.alldata[i].id])
              //loop for get media feature image
              for (let f = 0; f < this.post_data[this.category.alldata[i].id].length; f++) {
                //get media data
                this.db.getmedia_picture(this.post_data[this.category.alldata[i].id][f].featured_media).then(
                  feature => {
                    let f_image : any = feature;
                    this.feature_image[this.post_data[this.category.alldata[i].id][f].id] = f_image.source_url
                  },
                  feature_err => { console.log("err fea", feature_err) }
                )
              }
              
            }
          )
          if(i >= this.category.alldata.length-1){
            this.isloading = false;
          }

        }
        
      },
      error => { this.isloading = false; }
    )


    //get media from media post array by post id
  }

  load_data() {
    console.log("dataa lang", this.db.language)
    this.db.getdatainhomepage(this.db.language).then(
      alldata => {
        console.log("data cate", alldata);
        this.category = alldata;
        for (let i = 0; i < this.category.length; i++) {
          let slugname = this.category[i].slug.split('-');
          console.log('slugname', slugname[0]);
          this.cateicon[this.category[i].slug] = "assets/imgs/" + slugname[0].trim() + ".png";
          for (let a = 0; a < this.category[i].data.length; a++) {
            //this.getimagefeature(this.category[i].data[a].featured_media, this.category[i].data[a].id);
            this.feature_image[this.category[i].data[a].id] = this.category[i].feature_image[a].source_url
            // console.log('data',alldata[i].data[a]);
          }
        }
        //this.db.hideloading();
        this.isloading = false;
      },
      error => {
      this.isloading = false;//this.db.hideloading();
      }
    )
      .catch(
        error => {
        this.isloading = false;//this.db.hideloading()
        }
      )
  }

  loadsocial() {
    this.db.getsocialLink(this.db.language).then(
      socialdata => {
        this.sociallink = socialdata
      }
    )
  }


  openweb(link) {
    let url = "";
    switch (link) {
      case "webboard":
        //   url = 'https://www.yoonthai.com/'+this.db.language+'/topics';
        // this.inb.create(url,"_blank","location=no");
        // this.navCtrl.push('WebboardPage')
        this.app.getRootNav().getActiveChildNav().select(1);
        //window.open(url,'_system', 'location=yes');
        break;
      case "facebook":
        url = "fb://profile/youinthai";//"https://www.facebook.com/youinthai";
        // this.inb.create(url,"_blank","location=no");
        window.open(url, '_system', 'location=yes');
        break;
      case "instragram":
        url = "instagram://user?username=yoonthai";//"https://www.instagram.com/yoointhai/"
        //this.inb.create(url,"_blank","location=no");
        window.open(url, '_system', 'location=yes');
        break;
      case "youtube":
        url = "https://www.youtube.com/channel/UCnPZS16z_g5SiyupCqiR8ag"
        window.open(url, '_system', 'location=yes');//this.inb.create(url,"_blank","location=no");
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
