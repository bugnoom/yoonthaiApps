import { DbProvider } from './../../providers/db/db';
import { NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator , LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Storage } from '@ionic/storage';


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

  @Input('data') data : any;
  @Input('curlat') curlat : any;
  @Input('curlng') curlng : any;
  
  dif : any 
  //cur lat = 13.7246502
  //cur lng = 100.5843324

  lat : any;
  lng : any;

  constructor(private navCtrl : NavController,private geolocation : Geolocation,  private launchnavigator : LaunchNavigator,private db : DbProvider,private storage : Storage) {
    this.initFunction();
    //get current position lat and long
 //   this.dif = this.db.calculateDistance(this.cur_lat,this.data.lat,this.cur_lng,this.data.lng);
 
  }

  ngOnInit() {
    this.initFunction();
   
  }

  initFunction(){
    this.storage.get('current_lat').then((val)=>{this.lat = val;console.log("lat from storage :",val)});
    this.storage.get('current_lng').then((val)=>{this.lng = val;console.log("lng from storage :",val)});

    console.log(this.data.lat,this.data.lng,this.lat,this.lng);
    this.dif = this.db.getDistanceFromLatLonInKm(this.data.lat,this.data.lng,this.lat,this.lng).toFixed(2) + " km";
    console.log("DIF : " + this.dif);
  }

  opendetail(id){
    this.navCtrl.push('DetailPage',{ids : id});
  }

  openmap(lat,lng){
   
    let source : any = [this.lat, this.lng];

    let options : LaunchNavigatorOptions = {
      start : source
   };
   console.log(options);

   let dest = [lat,lng]
   this.launchnavigator.navigate(dest, options).then(
     success => console.log("Luanched"),
     error => console.log("error nav lunch")
   )
  }

 

}
