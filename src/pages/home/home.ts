
import { DbProvider } from './../../providers/db/db';
import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';

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
  diff : string = '0';
  imgfeature : any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public translate: TranslateService, private db: DbProvider, private mylocation : Geolocation,private launchnavigator: LaunchNavigator) {
  
    this.load_recomment();
     this.load_data();

   
  }


  ionViewDidLoad() {
   /*  this.load_recomment();
    this.load_data(); */
   
  }

  opencategory(id){
    this.navCtrl.push('CategoryPage',{ids:id});
  }

  ionViewDidEnter() {
    let watch = this.mylocation.watchPosition();
    watch.subscribe((data) => {
      this.curlat = data.coords.latitude;
      this.curlng = data.coords.longitude;
     // this.initFunction(data.coords.latitude, data.coords.longitude);
    });

  }

  load_recomment(){
    this.db.getPostbyCategory(132,5).then(
      data => { this.data_recomment = data; 
             for(let i = 0; i < this.data_recomment.length; i++){
               this.getimagefeature(this.data_recomment[i].featured_media,this.data_recomment[i].id);
              // console.log("Recomment id", this.data_recomment[i].id);
             }
              
              },
      err => { console.log('error', err) }
    )

  }

  load_data(){
    this.db.showloading();
    this.db.getdatainhomepage().then(
      alldata => {
        this.category = alldata;
        for(let i = 0; i< this.category.length; i++){
          for(let a = 0; a<this.category[i].data.length; a++){
             this.getimagefeature(alldata[i].data[a].featured_media,alldata[i].data[a].id);
          console.log('data',alldata[i].data[a]);
          }
        
        }
       
        
        this.db.hideloading();
      }
    )
   
  }
  

  openmap(destlat, destlng) {
    this.db.showloading();
    let source: any = [this.curlat, this.curlng];
    let options: LaunchNavigatorOptions = {
      start: source
    };
    console.log(options);
    let dest = [destlat, destlng]
    this.launchnavigator.navigate(dest, options).then(
      success => { console.log("Luanched"); this.db.hideloading() },
      error => { console.log("error nav lunch"); this.db.hideloading() }
    )
  }
  
  getdistanct(destlat,destlng){
    return this.diff = this.db.getDistanceFromLatLonInKm(this.curlat,this.curlng,destlat,destlng).toFixed(2) + "km";
  }

  opendetail(id) {
    this.navCtrl.push('DetailPage', { ids: id });
  }

  getimagefeature(feature_id,post_id){
    this.db.getmedia_picture(feature_id).then(
      datas =>{ this.imgfeature = datas;
              if(!datas){
                  this.feature_image[post_id] = "";
              }else{
                    this.feature_image[post_id] = this.imgfeature.source_url;
                    console.log(datas);
              }
    },
      err => { console.log("eerr",err)},
    )
  }

}
