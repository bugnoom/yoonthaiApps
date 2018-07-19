import { Storage } from '@ionic/storage';
import { DbProvider } from './../../providers/db/db';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-webboard-add',
  templateUrl: 'webboard-add.html',
})
export class WebboardAddPage {

  @ViewChild('myInput') myInput: ElementRef;

  topic : any = {
    title : "",
    detail : "",
    author : "",
  }
 
  toggled: boolean = false;
  topicdata : any;
  userdetail : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController, private db : DbProvider, private alertCtrl : AlertController,  public storage : Storage) {
    this.topic.author = this.navParams.get('author');
    console.log("author is : ", this.navParams.get('author'))
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad WebboardAddPage');
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
}

  addnew(){
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
    this.db.webboardTopic(this.topic).then(
      data =>{
        this.topicdata = data;
        console.log('add topic data',this.topicdata)
        if(this.topicdata.code == 200){
         
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
          
        }
        
      }
    )
  }
 
 
handleSelection(event) {
  this.topic.detail = this.topic.detail + " " + event.char;
}

}
