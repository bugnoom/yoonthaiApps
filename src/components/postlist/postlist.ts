import { DbProvider } from './../../providers/db/db';
import { NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';


/**
 * Generated class for the PostlistComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'postlist',
  templateUrl: 'postlist.html'
})
export class PostlistComponent {

  @Input('data') data: any;
  @Input('curlat') curlat: number;
  @Input('curlng') curlng: number;
  @Input('featureImg') featureImg: any;

  dif: any
  //cur lat = 13.7246502
  //cur lng = 100.5843324

  
  feature_image: any = [];
  constructor(private navCtrl: NavController, private launchnavigator: LaunchNavigator, private db: DbProvider, private storage: Storage, private mylocation: Geolocation) {
    //this.initFunction(this.data);
    //get current position lat and long
    //   this.dif = this.db.calculateDistance(this.cur_lat,this.data.lat,this.cur_lng,this.data.lng);
    //console.log("this is contructor", this.featureImg)
  }

  ngOnInit() {
  
    let watch = this.mylocation.watchPosition();
    watch.subscribe((data) => {
      this.curlat = data.coords.latitude;
      this.curlng = data.coords.longitude;
      this.initFunction(this.data);
    });

    //console.log('imgae',this.featureImg);
    this.getimagefeature(this.data.featured_media)
    

  }

  getimagefeature(id){
    if(id != 'undefined'){
    console.log("data id",id);
    this.db.getmedia_picture(id).then(
      data =>{ if(!data){
              console.log('can not get image');
              }else{
                this.feature_image = data; 
                console.log("feature image",data,id)
              }
    },
      err => { console.log("eerr",err)},
    )
  }
  }

  initFunction(data) {
    this.dif = this.db.getDistanceFromLatLonInKm(data.latlong, data.longtitude, this.curlat, this.curlng).toFixed(2) + " km";
    //this.getimagefeature(data.featured_media);
  }

  opendetail(id) {
    this.navCtrl.push('DetailPage', { ids: id });
  }

  openmap(lat, lng) {
    this.db.showloading();
    let source: any = [this.curlat, this.curlng];
    let options: LaunchNavigatorOptions = {
      start: source
    };
    console.log(options);
    let dest = [lat, lng]
    this.launchnavigator.navigate(dest, options).then(
      success => { console.log("Luanched"); this.db.showloading() },
      error => { console.log("error nav lunch"); this.db.hideloading() }
    )
  }



}
