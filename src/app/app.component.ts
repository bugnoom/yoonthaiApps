import { DbProvider } from './../providers/db/db';
import { Geolocation } from '@ionic-native/geolocation';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from  '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav : Nav;

  rootPage:any = 'HomePage';
  logedin : boolean;

  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private translate : TranslateService,private geolocation : Geolocation, private db : DbProvider, private storage : Storage) {
    this.initalApps();
    this.logedin = false
  }

  initalApps(){
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#555555');
      
      this.splashScreen.hide();

      this.initTranslate()

      this.geolocation.getCurrentPosition().then(
        (resp => {
          console.log(resp);
          this.storage.set('current_lat', resp.coords.latitude);
          this.storage.set('current_lng', resp.coords.longitude);
          this.db.clat = resp.coords.latitude;
          this.db.clng = resp.coords.longitude;
        })
      ).catch(
        (error) => {
          console.log("location :",  error);
        });
  
        let watch = this.geolocation.watchPosition();
        watch.subscribe((data)=>{
          this.storage.set('current_lat', data.coords.latitude);
          this.storage.set('current_lng', data.coords.longitude);
          this.db.clat = data.coords.latitude;
          this.db.clng = data.coords.longitude;
        })

    });

  


  }

  initTranslate() {
    this.translate.addLangs(["en", "th", "ko"]);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
}

  openlogin(){
    
    this.nav.push('LoginPage');
  }

  


}

