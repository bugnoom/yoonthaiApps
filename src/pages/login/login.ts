import { DbProvider } from './../../providers/db/db';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events} from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  registerCredentials :any = {email : '', password : ''}
  datalogin : any = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, private db : DbProvider, private storage : Storage, private toast : ToastController, public event : Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
   // console.log("login",this.registerCredentials);
   this.db.showloading();
    this.db.getlogin(this.registerCredentials.email, this.registerCredentials.password).then(
      data => {
        this.datalogin = data;
        if(!this.datalogin.id){
          this.db.hideloading();
          this.showtoast('Error Login')
        }else{
          //set login detail
          this.db.hideloading();
          this.storage.set("logedin","Y");
          this.storage.set("data_login",this.datalogin);
          this.event.publish("user:login",this.datalogin);
          this.navCtrl.setRoot("HomePage");
        }
        
      },
      err => {
        console.log('eror user',err)
        this.db.hideloading();
      }
    )
  }


  showtoast(message){
    let toast = this.toast.create({
      message : message,
      duration : 3000,
      position: 'middle'
    });

    toast.onDidDismiss(()=>{
      console.log("toast dismiss")
    })
  
    toast.present();
  }

  createAccount(){

  }

}
