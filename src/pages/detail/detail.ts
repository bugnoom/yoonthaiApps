import { DbProvider } from './../../providers/db/db';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from  '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';


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
  scripts : string;
  is_ios : boolean  = false; // check platform to show video

  telnumber :any [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private db : DbProvider, private storage : Storage,private sanitizer : DomSanitizer, private inb : InAppBrowser, private callnumber : CallNumber,private domSanitizer: DomSanitizer, private youtube : YoutubeVideoPlayer, private platform : Platform) {
    this.detaildata = this.navParams.get('detaildata');
    this.feature_img = this.navParams.get('featureImage');
    this.position = this.navParams.get('lat_lng');
    if(this.platform.is('ios')){
      this.is_ios = true;
    }

  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
   
  }

  ionViewDidLoad() {
    this.telnumber = this.detaildata.tel_number.split(',');
    
    console.log('ionViewDidLoad DetailPage',this.detaildata);
    console.log("youtube url",this.detaildata.youtube_url);
   
    console.log('fea',this.feature_img);
    console.log('latlng', this.position.lat, this.position.lng);
    
    let regx = /<a href='([\S]+)'>/g;

    //let newString = this.detaildata.content.rendered.replace(regx," id=\"im\" onClick=\"window.open('$1', '_blank', 'location=yes')\"")
  let newString = this.detaildata.content.rendered.replace(regx," <button id=\"t\" onclick=\"showPhotoView('$1')\">" );
  
    this.data = {
                  title : this.detaildata.title.rendered,
                  content : this.domSanitizer.bypassSecurityTrustHtml(newString)
                };

                this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.detaildata.youtube_url);
    
  }

 
  handleIFrameLoadEvent(): void {
    //this.db.hideloading();
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

  openvideo(url){
    let id = url.split('/');
    let urlid = id[id.length-1];
    console.log(urlid);
    this.youtube.openVideo(urlid+'');
  }

  addfav(data){
    //console.log(data);
    this.storage.get('favlist').then(
      data=>{

      })  
    this.storage.set('favlist',data);
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
