import { FcmproviderProvider } from './../providers/fcmprovider/fcmprovider';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Globalization } from '@ionic-native/globalization';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MyApp } from './app.component';
import { DbProvider } from '../providers/db/db';

import { GoogleMaps } from '@ionic-native/google-maps';

import { LaunchNavigator } from '@ionic-native/launch-navigator';

import { IonicStorageModule } from '@ionic/storage';
import { I18nSwitcherProvider } from '../providers/i18n-switcher/i18n-switcher';

import { CallNumber } from '@ionic-native/call-number'

import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { Firebase } from '@ionic-native/firebase';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { Network } from '@ionic-native/network';
import { NetworkcheckProvider } from '../providers/networkcheck/networkcheck';

//import { EmojiPickerModule } from '@ionic-tools/emoji-picker';

import { UserAgent } from '@ionic-native/user-agent';



export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot(),
   // EmojiPickerModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Geolocation,
    DbProvider,
    GoogleMaps,
    LaunchNavigator,
    Globalization,
    I18nSwitcherProvider,
    InAppBrowser,
    CallNumber,
    YoutubeVideoPlayer,
    Firebase,
    LocalNotifications,
    FcmproviderProvider,
    NetworkcheckProvider,
    Network,
    UserAgent,
    

  ]
})
export class AppModule { }
