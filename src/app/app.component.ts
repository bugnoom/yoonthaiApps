
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Globalization } from '@ionic-native/globalization';
import { DbProvider } from './../providers/db/db';
import { Geolocation } from '@ionic-native/geolocation';

import { I18nSwitcherProvider } from './../providers/i18n-switcher/i18n-switcher';
import { Subscription } from 'rxjs/Subscription';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'HomePage';
  logedin: boolean;
  categorylist: any = [];

  private i18nSubscription: Subscription;

  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private translate: TranslateService, private geolocation: Geolocation, private db: DbProvider, private storage: Storage, private globlization: Globalization, private I18nSwitcherProvider: I18nSwitcherProvider) {
    this.initalApps();
    this.initTranslate();
    this.getcategory();
    this.logedin = false

    this.translate.onLangChange.subscribe((event: LangChangeEvent)=>{
      this.db.getParentCategories(this.db.language).then(
        data => { this.categorylist = data;console.log('cate data',data)},
        err => { console.log(err); }
      );
    })

  }

  initalApps() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#555555');

      this.splashScreen.hide();

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
          console.log("location :", error);
        });

      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
        this.storage.set('current_lat', data.coords.latitude);
        this.storage.set('current_lng', data.coords.longitude);
        this.db.clat = data.coords.latitude;
        this.db.clng = data.coords.longitude;
      });



    });

  

  }

  initTranslate() {
    this.globlization.getPreferredLanguage()
      .then((mylang) => {
        this.db.language = mylang.value
        this.translate.setDefaultLang(mylang.value);
        this.translate.use(mylang.value);
        this.I18nSwitcherProvider.switchLang(mylang.value);
      })
      .catch(e => console.log('mylang error', e))

    /* this.translate.addLangs(["en", "th", "ko"]);*/


    this.i18nSubscription = this.I18nSwitcherProvider.watch().subscribe((lang: string) => {
      this.translate.use(lang);
    })
  }

  ngOnDestroy(): void {
    if (this.i18nSubscription != null) {
      this.i18nSubscription.unsubscribe();
    }
  }

  openlogin() {
    this.nav.push('LoginPage');
  }

  getcategory() {
    this.db.getParentCategories(this.db.language).then(
      data => { this.categorylist = data;console.log('cate data',data)},
      err => { console.log(err); }
    );
    
  }

  opencategory(id) {
    this.nav.push('CategoryPage', { ids: id });
  }

  opensetting(){
    this.nav.push('SettingPage');
  }

}

