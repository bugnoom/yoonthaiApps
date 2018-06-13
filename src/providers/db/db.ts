import { Storage } from '@ionic/storage';
import { I18nSwitcherProvider } from './../i18n-switcher/i18n-switcher';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  baseURL: string = "https://www.yoonthai.com/";
  url: string = this.baseURL + "webservices/services.php";//
 /*  baseURL: string = "http://192.168.1.52/yoonthai/";
  url : string = this.baseURL + "mobileservices/services.php"; */
 language: string;
 loading: any

 clat : any;
 clng : any;

 feature_image: any = [];
 logedin :boolean = false;
 
  constructor(public http: HttpClient, private loadingCtrl : LoadingController,private translate: TranslateService, private i18n : I18nSwitcherProvider, private storage : Storage) {
     
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

  getcatedetail(id){
    var url = this.url+"?action=getCategoryById&id="+id+"&language="+this.language;
    return new Promise(resolve =>{
      this.http.get(url).subscribe(
        data => { resolve(data)
        }, err => {
          console.log(err);
        });
    });
  }

  getdatainhomepage(lang){
    let l = 'ko';
    var url = this.url+"?action=getPostFirstPage&l="+l+"&language="+lang;
    console.log("is url is ",url);
    return new Promise(resolve =>{
      this.http.get(url).subscribe(data=>{
        resolve(data);
      }, err=>{
        console.log(err);
      });
    });
  }

  getParentCategories(lang) {
    var url = this.url + "?action=getAllParentCategories&language="+lang;
    return new Promise(resolve =>{
      this.http.get(url).subscribe(data=>{
        resolve(data);
      }, err =>{
        console.log(err);
      });
    });
  }

  getPostbyCategory(cate_id,page,lang){
    if(cate_id == 'undefined'){ return; }
    let url = this.url + "?action=getPostByCategories&cat="+cate_id+"&page="+page+"&language="+lang;
    return new Promise(resolve =>{
      this.http.get(url).subscribe(data=>{
        resolve(data);
      }, err =>{
        console.log(err);
      });
    });
  }

  getmedia_picture(id){
    if(id == 'undefined'){ return; }
    let l = (this.language == "undefined")? "" : ""+this.language;
   var url = this.baseURL+"wp-json/wp/v2/media/"+id
    //var url = this.url + "?action=getmedia&id="+id;
    return new Promise(resolve =>{
      this.http.get(url).subscribe(data=>{
        resolve(data);
      }, err =>{
        resolve()
        console.log(err);
      });
    });
  }

  getuserDetail(id){
    let url = this.url + "?action=getUserDetail&id="+id;
    return this.http.get(url);
  }

  getheader(){
    let headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Access-Control-Allow-Headers' ,'Content-Type, Authorization');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');
    return headers;
  }

  register_account(datalogin){
    let url = this.baseURL+"wp-json/wp/v2/users/register";
    
    return new Promise(resolve=>{
      this.http.post(url,datalogin,{ headers: this.getheader() }).subscribe(data=>{
        resolve(data);
      }, err =>{
        resolve(err);
        console.log("register error",err)
      })
    })
  }

  updateaccount(id,userdata){
    let url = this.baseURL+"wp-json/wp/v2/users/"+id;
    
    return new Promise(resolve =>{
      this.http.post(url,userdata,{headers : this.getheader()}).subscribe(data=>{
        resolve(data);
      }, err => {
        resolve(err);
        console.log("update error",err);
      })
    })
    
  }


  getsocialLink(lang){
    var url = this.baseURL+lang+"/wp-json/wp/v2/social_menu";
    return new Promise(resolve =>{
      this.http.get(url).subscribe(data=>{
        resolve(data);
      }, err =>{
        resolve();
        console.log(err);
      });
    });
  }


  getlogin(username,password){
    let url = this.url + "?action=userLogin&username="+username+"&password="+password;
    return new Promise(resolve => {
      this.http.get(url).subscribe(
        data => {
          resolve(data);
        }, err =>{
          console.log(err);
        });
    });
  }

  getwebboard(page){
    let url = this.url + "?action=getCommentPost&page="+page+"&language="+this.language;
    return new Promise(resolve =>{
      this.http.get(url).subscribe(data=>{
        resolve(data);
      }, err =>{
        console.log(err);
      });
    });
  }

  //check Login status
  checklogin(){
     this.storage.get('data_login').then(
       data => {this.logedin = true;},
       err => { this.logedin = false;}
     ).catch(
       () => {this.logedin = false}
     )
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
