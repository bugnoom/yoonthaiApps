
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, NavController, Events } from 'ionic-angular';
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
  logedin: boolean = false;
  userdetail: any = [];
  categorylist: any = [];
  avatar : string;

 private menuicon : any =[];

  private i18nSubscription: Subscription;

  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private translate: TranslateService, private geolocation: Geolocation, private db: DbProvider, private storage: Storage, private globlization: Globalization, private I18nSwitcherProvider: I18nSwitcherProvider,public event : Events) {
    this.initalApps();
    this.initTranslate();
    this.getcategory(this.db.language);
    this.checklogin();
    
    this.event.subscribe('user:login',(data)=>{
      console.log("wellcome");
      this.checklogin();
    })

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getcategory(event.lang);
      
    })

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.checklogin();
  }

  checklogin() {
    console.log("wellcome Startpage",this.storage.get('data_login'));
    this.storage.get('data_login').then(
      (data) => {
        this.userdetail = data;
        if (this.userdetail) {
          this.logedin = true;
          console.log("uername",this.userdetail);
         this.avatar = this.userdetail.avatar_urls[96];
        } else {
          console.log("uername erro");
          this.logedin = false;
          this.avatar = 'assets/imgs/no-image.jpg';
        }

      },
      err => {
        console.log("uername erro", err);
        this.logedin = false;
      }
    )
  }

  initalApps() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();
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
    let userLang = "";
    this.storage.get('mylang').then(
      (data) => {
        this.db.language = data
        this.translate.setDefaultLang(data);
        this.translate.use(data);
        this.I18nSwitcherProvider.switchLang(data);
      },
      err => {
        userLang = navigator.language.split('-')[0];
        userLang = /(th|ko)/gi.test(userLang) ? userLang : 'th';
        this.storage.set('mylang', userLang);
        this.db.language = userLang
        this.translate.setDefaultLang(userLang);
        this.translate.use(userLang);
        this.I18nSwitcherProvider.switchLang(userLang);
      }
    )

    console.log("userlang ", this.db.language);




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

  logout(){
    this.storage.remove('data_login');
    this.storage.remove('logedin');
    this.logedin = false;
    this.db.logedin = false;
    this.nav.setRoot('HomePage');
  }

  getcategory(lang) {
    this.db.getParentCategories(lang).then(
      data => { 
        this.categorylist = data; 
        for(let i = 0; i < this.categorylist.length; i++){
          let slugname = this.categorylist[i].slug.split('-');
          this.menuicon[this.categorylist[i].slug] = 'assets/imgs/'+slugname[0].trim()+'.png';
        }
        console.log('icon is',this.menuicon);
        console.log('cate data', data) },
      err => { console.log(err); }
    );

  }

  opencategory(id) {
    this.nav.push('CategoryPage', { ids: id });
  }

  opensetting() {
    this.nav.push('SettingPage');
  }

}

