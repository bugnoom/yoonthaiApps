import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root = 'HomePage';
  tab2Root = 'WebboardPage';
  tab3Root = 'ShopPage';
  tab4Root = 'LoginPage';

  profile : any 

  badge : any = 0;


  constructor(public navCtrl: NavController, public navParams: NavParams, public storage : Storage) {
    
  }

  ionViewDidLoad() {
   
  }

}
