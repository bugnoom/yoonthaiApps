import { Storage } from '@ionic/storage';
import { DbProvider } from './../../providers/db/db';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';


/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {

  product: any = 0;
  grid: Array<Array<string>>;
  hasMoreData:boolean = false;
  page : number = 1;
  key : any;
  cart : any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,public db :DbProvider, public event : Events, private storage : Storage) {
    this.db.getcart().then(data =>{this.cart = data},err=>{this.cart = 0;})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
    this.getallproduct();
  }

  ionViewDidEnter(){
   this.db.getcart().then(data =>{this.cart = data},err=>{this.cart = 0;})
   console.log("get cart", this.cart);
  }

  
  doInfinite(event){
    this.page = this.page + 1;
    setTimeout(() => {
      event.complete();
    },1000);
  }

  showdata() {
    this.grid = Array(Math.ceil(this.product.length / 2))
    console.log(this.grid);
    let rowNum = 0;
    for (let i = 0; i < this.product.length; i += 2) {
      this.grid[rowNum] = Array(2);

      if (this.product[i]) {
        this.grid[rowNum][0] = this.product[i]
      }

      if (this.product[i + 1]) {
        this.grid[rowNum][1] = this.product[i + 1];
      }
      rowNum++;
    }
  }

  getallproduct(){
    this.db.getallproduct(this.page).then(
      (data) => {
        this.product = data;
        console.log("product",this.product)
        this.showdata(); 
      }
    )
  }

  opencart(){
    this.navCtrl.push('ShopCartPage')
  }

}
