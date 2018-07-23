import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  DomSanitizer } from '@angular/platform-browser';


@IonicPage()
@Component({
  selector: 'page-productdetail',
  templateUrl: 'productdetail.html',
})
export class ProductdetailPage {

  productdetail : any;
  detail : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private domSanitizer: DomSanitizer, private inb : InAppBrowser) {
    console.log("DATA DETAIL",this.navParams.get("data"));
    this.productdetail = this.navParams.get('data');
    let regex  ='';// /<iframe class="iframindetail" style="border:none;overflow:hidden;" src=''(.+)<\/iframe>/g;
    let newString = this.productdetail.description.replace(regex,"");
    this.detail= {
      'description' : this.domSanitizer.bypassSecurityTrustHtml(newString),
      'price' : "<span>Price : </span>" + this.productdetail.price_html
    }  
    
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProductdetailPage');
   
  }

  buynow(data){
    this.inb.create(data.permalink,"_blank","location=no")
  }

}
