import { InAppBrowser } from '@ionic-native/in-app-browser';
import { DbProvider } from './../../providers/db/db';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events, Navbar} from 'ionic-angular';
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
  @ViewChild(Navbar) navBar : Navbar

  registerCredentials :any = {email : '', password : ''}
  datalogin : any = {}

  constructor(public navCtrl: NavController, public navParams: NavParams, private db : DbProvider, private storage : Storage, private toast : ToastController, public event : Events, private inb : InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.navBar.backButtonClick = (e:UIEvent)=>{
      // todo something
      this.navCtrl.pop();
     }
  }

  login(){
   // console.log("login",this.registerCredentials);
   this.db.showloading();
    this.db.getlogin(this.registerCredentials.email, this.registerCredentials.password).then(
      data => {
        this.datalogin = data;
        console.log("data login", this.datalogin);
        if(!this.datalogin.id){
          this.db.hideloading();
          this.showtoast('Error Login')
        }else{
          //set login detail
          this.storage.set("logedin","Y");
          this.storage.set("data_login",data);
          this.event.publish("user:login",data);
          this.db.hideloading();
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
    this.navCtrl.push('RegisterPage');
  //let url = 'http://www.yoonthai.com/'+this.db.language+'/Register/';
   //   this.inb.create(url,"_blank","location=no");
  }

  resetPassword(){
    let url = 'http://www.yoonthai.com/'+this.db.language+'/password-reset/';
      this.inb.create(url,'_blank',"location=no");
  }

}
