import { Storage } from '@ionic/storage';
import { DbProvider } from './../../providers/db/db';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user : any = {
    username : "",
    password : "",
    email : "",
    mobile_number : ""
  };

  logindata : any;
  userdata : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db : DbProvider, private toast : ToastController, private storage : Storage, public event : Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    this.db.showloading();
    console.log("data is ",this.user);
    this.db.register_account(this.user).then(
      data => { this.logindata = data;
        if(this.logindata.code == 200){
          this.db.getlogin(this.user.username,this.user.password).then(
            login => {
              this.userdata = login;
              if(!this.userdata.id){
                this.db.hideloading();
                let t  = this.toast.create({message : this.logindata.message,duration: 5000,position:'middle'})
                t.onDidDismiss(()=>{this.db.hideloading();});
                t.present();
              }else{
              this.storage.set("logedin","Y");
              this.storage.set("data_login",login);
              this.event.publish("user:login",login);
              this.showtoast(this.logindata.message)
              }
            },
            loginerr => {console.log("Can't retister",loginerr); 
            
            let t = this.toast.create({message : loginerr,duration: 5000,position:'middle'})
            t.onDidDismiss(()=>{this.db.hideloading();})
            t.present();
          })
         

        }else{
         let t =  this.toast.create({message : this.logindata.error.message,duration: 5000,position:'middle'});
         t.onDidDismiss(()=>{this.db.hideloading();})
         t.present();
        
        }
      },
      err => {console.log("Error in register.ts",err)}
    )

  }

  showtoast(message){
    let toast = this.toast.create({
      message : message,
      duration : 5000,
      position: 'top'
    });

    toast.onDidDismiss(()=>{
      console.log("toast dismiss");
      this.db.hideloading();
      this.navCtrl.setRoot("HomePage");
    })
  
    toast.present();
  }

}
