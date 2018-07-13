import { DbProvider } from './../../providers/db/db';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WebboardDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public db : DbProvider) {
    this.commentdata = {
      'data' :this.navParams.get('rowsdata'),
      'author' : this.navParams.get('author')
    }
    
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
      console.log('user comment',data)
      let userdetail : any = data;
      this.commentuser[id] = userdetail.avatar_urls[48]
    },err=>{console.log('user',err)})
    
  }

}
