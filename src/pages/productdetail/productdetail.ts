import { Storage } from '@ionic/storage';
import { DbProvider } from './../../providers/db/db';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';


@IonicPage()
@Component({
  selector: 'page-productdetail',
  templateUrl: 'productdetail.html',
})
export class ProductdetailPage {

  productdetail: any;
  detail: any;
  cart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private domSanitizer: DomSanitizer, private inb: InAppBrowser, private modal: ModalController, public event: Events, public db: DbProvider, private storage : Storage) {
    console.log("DATA DETAIL", this.navParams.get("data"));
    this.productdetail = this.navParams.get('data');
    let regex = '';// /<iframe class="iframindetail" style="border:none;overflow:hidden;" src=''(.+)<\/iframe>/g;
    let newString = this.productdetail.description.replace(regex, "");
    this.detail = {
      'description': this.domSanitizer.bypassSecurityTrustHtml(newString),
      'price': "<span>Price : </span>" + this.productdetail.price_html
    }



  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProductdetailPage');
    this.db.getcart().then(data => { this.cart = data },err =>{this.cart = 0;})
  }

  ionViewDidEnter() {
    this.db.getcart().then(data => { this.cart = data },err =>{this.cart = 0;})
  }

  buynow(datas) {
    let id = this.productdetail.id;
    if (this.productdetail.variations.length > 0) {
      //this.inb.create(data.permalink,"_blank","location=no");
      let modalvariable = this.modal.create('ShopVariationPage', { data: this.productdetail });
      modalvariable.onDidDismiss(data => {
        this.ionViewDidEnter()
      })
      modalvariable.present()
    }else{
      this.storage.get('cart').then(
        data => {
          if(data){
            this.cart  = data;
            this.cart.push(id);
            this.storage.set('cart',this.cart);
            this.event.publish('cartitem',this.cart.length)
          }else{
            this.cart = [id]
            this.storage.set('cart',this.cart);
            this.event.publish('cartitem',1)
          }
        },
        err => {}
      )
      this.opencart();
    }


  }

  opencart() {
    this.navCtrl.push('ShopCartPage')
  }

}
