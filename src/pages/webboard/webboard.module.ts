import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WebboardPage } from './webboard';

@NgModule({
  declarations: [
    WebboardPage,
  ],
  imports: [
    IonicPageModule.forChild(WebboardPage),
    TranslateModule.forChild(),
  ],
})
export class WebboardPageModule {}
