import { Storage } from '@ionic/storage';
import { DbProvider } from './../../providers/db/db';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ModalController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-webboard-detail',
  templateUrl: 'webboard-detail.html',
})
export class WebboardDetailPage {

  commentdata : any;
  commentdetail : any ;
  commendauthor : any = [];
  commentuser : any = [];
  hasreply :boolean = false;
  chklogin : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db : DbProvider, public storage : Storage, private app : App, public modal : ModalController) {
    this.commentdata = {
      'data' :this.navParams.get('rowsdata'),
      'author' : this.navParams.get('author')
    }
    

    console.log("LOGIN ? ",this.db.logedin);
    
  }

  ionViewDidLoad() {
    console.log('detail load',this.commentdata);
    this.db.getcomment(this.commentdata.data.ID).then(
      data => { this.commentdetail = data;
        console.log("comment",data);
        for(let i = 0; i< this.commentdetail.length; i++){
          this.getuser(this.commentdetail[i].user_id);
        }
      },
      err => {console.log("err comment",err)}
    )
  }

  getuser(id){
    this.db.getuserDetail(id).subscribe(data=>{
      console.log('user comment',data,id)
      let userdetail : any = data;
      this.commentuser[id] = userdetail.avatar_urls[48]
    },err=>{console.log('user',err)})
    
  }

  replycomment(parent){
    this.storage.get('data_login').then(
      detail => {
        console.log("data_login_storage ",detail);
        this.chklogin = detail;
        if(this.chklogin == null){
          this.app.getRootNav().getActiveChildNav().select(3); 
        }else{
          let newtopic = this.modal.create('WebboardReplyPage',{userlogin : this.chklogin, webboard : this.commentdata, parent : parent },{ enableBackdropDismiss: false });
          newtopic.onDidDismiss(()=>{this.ionViewDidLoad()});
          newtopic.present();
        }
       // this.navCtrl.setRoot("ProfilePage",{profile : detail})
         
      },err =>{console.log("Errr",err)})
  }

}
