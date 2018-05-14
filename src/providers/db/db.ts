import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { LoadingController, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';


/*
  Generated class for the DbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbProvider {

  userlogedin : boolean = false;
  baseURL: string = "http://www.yoonthai.com/";
  url: string = this.baseURL + "mobileservices/services.php";//
 language: string;
 loading: any

 clat : any;
 clng : any;
 
  constructor(public http: HttpClient, private loadingCtrl : LoadingController,private translate: TranslateService) {
    this.language = this.translate.currentLang;
  }

  showloading() {
    this.loading = this.loadingCtrl.create({
      content: "Loading ..."
    })
    this.loading.present();
  }

  hideloading() {
    this.loading.dismiss();
  }
  getCategories() {
    var url = this.url + "?action=getCategory";
    return this.http.get(url)
      //.do((res : Response) => console.log(res))
      .map((res: Response) => res.json())
  }

  getSlideBanner() {
    var url = this.url + "?action=getSlideBanner";
    return this.http.get(url)
      .do((res: Response) => console.log(res))
      .map((res: Response) => res.json());
  }

  // REF : https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula/27943#27943
  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  
}
