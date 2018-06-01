import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WebboardDetailPage } from './webboard-detail';

@NgModule({
  declarations: [
    WebboardDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(WebboardDetailPage),
  ],
})
export class WebboardDetailPageModule {}
