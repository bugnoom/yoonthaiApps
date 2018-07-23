import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Component,Input } from '@angular/core';


@Component({
  selector: 'productloop',
  templateUrl: 'productloop.html'
})
export class ProductloopComponent {

  text: string;
  @Input('data') data: any;

  constructor(private inb : InAppBrowser, public navCtrl : NavController, public navParams : NavParams) {
    console.log('Hello ProductloopComponent Component');
    
    this.text = 'Hello World';
  }

  ngOnInit(): void {
    console.log('product data in loop is',this.data);
    console.log("image src", this.data[0].images[0].src)
  }
  openproductDetail(url){
   // this.inb.create(url);
   this.navCtrl.push('ProductdetailPage',{data : this.data[0]})

  }
}
