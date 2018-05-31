
import { DbProvider } from './../../providers/db/db';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from  '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';


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
  comments: Array<any> = new Array<any>();
  trustedVideoUrl: SafeResourceUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db : DbProvider, private storage : Storage,private sanitizer : DomSanitizer, private inb : InAppBrowser, private callnumber : CallNumber, private photoviewer : PhotoViewer,private domSanitizer: DomSanitizer) {
    this.detaildata = this.navParams.get('detaildata');
    this.feature_img = this.navParams.get('featureImage');
    this.position = this.navParams.get('lat_lng');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage',this.detaildata);
    console.log("youtube url",this.detaildata.youtube_url);
   
    console.log('fea',this.feature_img);
    console.log('latlng', this.position.lat, this.position.lng);
    
    let regx = /href='([\S]+)'/g;
   // let newString = this.detaildata.content.rendered.replace(regx,"href=\"#\" onClick=\"window.open('$1', '_blank', 'location=yes')\"");
   
   let newString = this.detaildata.content.rendered.replace(regx," (click)=\"showPhotoView('$1')\"" );
    this.data = {
                  title : this.detaildata.title.rendered,
                  content : this.sanitizer.bypassSecurityTrustHtml(newString)
                };

                this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.detaildata.youtube_url);
    
  }

 
  handleIFrameLoadEvent(): void {
    //this.db.hideloading();
}

  showPhotoView(url){
    this.photoviewer.show(url);
  }

  opendatetime(data){
    let opendate = "";
    let opentime = "";
    //show open close date;
    if(data.opendate == 0 && data.closedate == 0){
      opendate = "Every day";
    }else if(data.opendate == 'undefined' && data.closedate == 'undefined'){
        opendate = 'n/a';
      }else{
        opendate = data.opendate + ' - ' + data.closedate;
    }
    
    //show open close time
    if(data.opentime == 0 && data.closetime == 0){
      opentime = "";
    }else if(data.opentime == 'undefined' && data.closetime == 'undefined'){
        opentime = 'n/a';
    }else{
      opentime = ' : ' + data.opentime + ' - ' + data.closetime;
    }

    return opendate +  opentime;
  }

  openpage(url){
    //console.log("URL "+url);
    this.inb.create(url,"_blank","location=no");
  }

  callout(number){

    this.callnumber.callNumber(number,true)
    .then(
      ()=> console.log("Luanched Dialer!"))
    .catch(
      () => alert('Sorry! your system is not support for call out')
    )
  }

  openweb(link){
    let url = "";
    switch(link){
      case "webboard":
       url = 'http://www.yoonthai.com/'+this.db.language+'/topics';
      this.inb.create(url,"_blank","location=no");
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

}
