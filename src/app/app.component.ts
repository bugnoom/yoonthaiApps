
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav : Nav;

  rootPage:any = 'HomePage';
  logedin : boolean;

  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private translate : TranslateService) {
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

