import { DbProvider } from './../../providers/db/db';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ShopCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop-cart',
  templateUrl: 'shop-cart.html',
})
export class ShopCartPage {

  product_data : any 
  items : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage : Storage, private db : DbProvider) {
    this.storage.get('cart').then(
      data => {this.items = data},
      err => {this.items = []}
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopCartPage');
  }

  sumproduct_price(){

  }

  removethis(){

  }

}
