import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  data : any 
  grid: Array<Array<string>>;
  lat: any;
  long : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private statusBar : StatusBar,private geolocation : Geolocation) {

    this.data = [{
      title : " test1",
      image : "https://github.com/ionic-team/ionic-preview-app/blob/master/src/assets/img/nin-live.png?raw=true",
      except : "This is Except content"
    },{
      title : " test2",
      image : "https://github.com/ionic-team/ionic-preview-app/blob/master/src/assets/img/nin-live.png?raw=true",
      except : "This is Except content"
    },{
      title : " test3",
      image : "https://github.com/ionic-team/ionic-preview-app/blob/master/src/assets/img/nin-live.png?raw=true",
      except : "This is Except content"
    },{
      title : " test4",
      image : "https://github.com/ionic-team/ionic-preview-app/blob/master/src/assets/img/nin-live.png?raw=true",
      except : "This is Except content"
    }];

    //get current position lat and long
    this.geolocation.getCurrentPosition().then(
      (resp => {
        console.log(resp);
        this.lat = resp.coords.latitude;
        this.long = resp.coords.longitude;
      })
    ).catch(
      (error) => {
        console.log("location :",  error);
      });

    //this.showdata();
  }

  

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad HomePage');
   
  }

  getItems(ev: any) {
    console.log(ev);
  }

  showdata() {
    this.grid = Array(Math.ceil(this.data.length / 2))
    console.log(this.grid);
    let rowNum = 0;
    for (let i = 0; i < this.data.length; i += 2) {
      this.grid[rowNum] = Array(2);

      if (this.data[i]) {
        this.grid[rowNum][0] = this.data[i]
      }

      if (this.data[i + 1]) {
        this.grid[rowNum][1] = this.data[i + 1];
      }
      rowNum++;
    }
  }

}
