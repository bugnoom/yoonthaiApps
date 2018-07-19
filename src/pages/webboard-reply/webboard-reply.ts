import { DbProvider } from './../../providers/db/db';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

/**
 * Generated class for the WebboardReplyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-webboard-reply',
  templateUrl: 'webboard-reply.html',
})
export class WebboardReplyPage {
  @ViewChild('myInput') myInput: ElementRef;

  commenddata : any = {
    userlogin : "",
    parent : "",
    comment : ""
  }
  
  topic : any = {
    detail : "",
    author : "",
  }
 
  toggled: boolean = false;
  result_add_comment : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl : ViewController,private alertCtrl : AlertController, private db : DbProvider) {
    this.commenddata = {
      userlogin : this.navParams.get('userlogin'),
      comment : this.navParams.get('webboard'),
      parent : this.navParams.get('parent')
    }
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad WebboardReplyPage',this.commenddata);
  }

  handleSelection(event) {
    this.topic.detail = this.topic.detail + " " + event.char;
  }

  addnewreply(){
    let replydata = {
      user_id : this.commenddata.userlogin.id,
      post_id : this.commenddata.comment.data.ID,
      content : this.topic.detail,
      parent : this.commenddata.parent
    }
    if(this.topic.title == "" || this.topic.detail == ""){
      let err = this.alertCtrl.create({
        title: 'Data not empty',
        subTitle: 'Plese fill information on title and detail',
        buttons: ['OK']
      });
      err.present();
      return;
    }
    this.db.showloading();

    this.db.addnewcomment(replydata).then(
      data =>{
        this.result_add_comment = data;
        console.log('add topic data',this.result_add_comment)
        if(this.result_add_comment.code == 200){
         
          let t = this.alertCtrl.create({
            title: 'Add Topic Success',
            subTitle: 'Add new topic is successfully',
            buttons: ['OK']
          });
          this.db.hideloading();
          t.onDidDismiss(()=>{
            // this.app.getRootNav().getActiveChildNav().select(1); 
            this.dismiss()
          });
          t.present();
          
        }else{
          console.log("error add new comment")
        }
        
      }
    )


    /* 'comment_post_ID' => $data['post_id'], // to which post the comment will show up
        'comment_author' => $userdata->user_login, //fixed value - can be dynamic 
        'comment_author_email' => $userdata->user_email, //fixed value - can be dynamic 
        'comment_author_url' => 'http://example.com', //fixed value - can be dynamic 
        'comment_content' => sanitize_text_field( $data['content'] ), //fixed value - can be dynamic 
        'comment_type' => '', //empty for regular comments, 'pingback' for pingbacks, 'trackback' for trackbacks
        'comment_parent' => sanitize_text_field( $data['parent'] ), //0 if it's not a reply to another comment; if it's a reply, mention the parent comment ID here
        'user_id' => $current_user->ID, //passing current user ID or any predefined as per the demand */

  }

}
