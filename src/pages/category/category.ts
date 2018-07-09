import { DbProvider } from './../../providers/db/db';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  cate_id : string = "";
  cate_name : any = "";
  cate_list : any = [];
  feature_image: any = [];
  imgfeature : any = {};
  curlat: any = 0;
  curlng: any = 0;
  diff : string = "0";

  page :number = 1;
  hasMoreData: boolean = true;

  isloading : boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db : DbProvider,private mylocation : Geolocation,private launchnavigator: LaunchNavigator, public event : Events) {
    
  }

  ionViewDidLoad() {
   
      this.watchlocation();
      this.cate_id = this.navParams.get('ids');
      this.getcatename();
      this.showdata();
    
   
  }

  doInfinite(even) {
    // console.log("infinite Scroll");
    this.page = this.page + 1;
    setTimeout(() => {
      this.db.getPostbyCategory(this.cate_id,this.page,this.db.language).then(
        getdata => {
        let nowcate : any = []; 
        nowcate = getdata;
        if(nowcate.code){this.hasMoreData = false;return;}
        for(let i = 0; i < nowcate.data.length; i++){
          let catnubmer = this.cate_list.length;
          this.cate_list[catnubmer] = nowcate[i];
          this.feature_image[nowcate.data[i].id] = nowcate.feature_image[i].source_url;
          console.log("now cate", this.feature_image[nowcate.data[i].id])
        }
        console.log('all cate list',this.cate_list);
        console.log('nowpostdata',getdata);
        even.complete();
      },err=>{
        console.log('error',err);
        even.complete();
      })
     
    }, 1000);
  }


watchlocation(){
  let watch = this.mylocation.watchPosition();
    watch.subscribe((data) => {
      this.curlat = data.coords.latitude;
      this.curlng = data.coords.longitude;
     // this.initFunction(data.coords.latitude, data.coords.longitude);
    });
}

  showdata(){
   this.isloading = true;
    this.db.getPostbyCategory(this.cate_id,this.page,this.db.language).then(getdata=>{
      this.cate_list = getdata;
      console.log('adfad',this.cate_list);
      for(let i = 0; i < this.cate_list.data.length; i++){
        //this.feature_image[this.cate_list[i].id] = this.getimagefeature(this.cate_list[i].featured_media, this.cate_list[i].id);
        this.feature_image[this.cate_list.data[i].id] = this.cate_list.feature_image[i].source_url;
        console.log("cate", this.feature_image[this.cate_list.data[i].id])
      }
      console.log('postdata',getdata);
      this.isloading = false;
      //this.db.hideloading();
    },err=>{
      console.log('error',err);
      this.isloading = false;
     // this.db.hideloading();
    })
  }

  getcatename(){
    this.db.getcatedetail(this.cate_id).then(
      data => { this.cate_name = data}
    )
  }

  opendetail(data, fea) {
    let lat_lng = { lat: this.curlat, lng: this.curlng }
    this.navCtrl.push('DetailPage', { detaildata: data, featureImage: fea, lat_lng: lat_lng });
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

  getdistanct(destlat,destlng){
    console.log('lat lng',this.curlat,this.curlng)
    return this.diff = this.db.getDistanceFromLatLonInKm(this.curlat,this.curlng,destlat,destlng).toFixed(2) + "km";
  }

  openmap(destlat, destlng) {
   
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
