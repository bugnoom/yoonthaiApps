import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'TabsPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

     /*  this.geolocation.getCurrentPosition().then(
        (resp => {console.log('this is lat and long',resp)})
      ).catch(
        (error) => {
          console.log("location :",  error);
        }); */
      

    });
  }

  pages:any = [];
    openPage(p){

  }


}

