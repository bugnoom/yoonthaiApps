import { DbProvider } from './../../providers/db/db';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ShopVariationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop-variation',
  templateUrl: 'shop-variation.html',
})
export class ShopVariationPage {

  product : any = {};
  product_variation : any = [] ;
  cart : any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController, private db : DbProvider, public event : Events, public storage : Storage) {
    this.product = this.navParams.get('data');
    
  }

  ionViewDidLoad() {
    for(let i = 0; i< this.product.variations.length; i++){
       this.db.getproductdetail(this.product.variations[i]).then(
         data => { let pdata = data;
           this.product_variation.push(pdata);
          },
         err => { console.log("Error to get Variable",err)}
       )
    }
  }


  dismis(id){
    this.viewCtrl.dismiss(id);
  }

  addtocart(id){
    //add in product storage and subscript for show a fab in athor page
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

   
  }

}
