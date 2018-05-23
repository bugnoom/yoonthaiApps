import { DbProvider } from './../../providers/db/db';
import { I18nSwitcherProvider } from './../../providers/i18n-switcher/i18n-switcher';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  language : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private I18nSwitcherProvider: I18nSwitcherProvider, private db : DbProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  switch(lang: string) {
    this.I18nSwitcherProvider.switchLang(lang);
    this.db.language = lang;
    this.navCtrl.setRoot('HomePage')
  }

}
