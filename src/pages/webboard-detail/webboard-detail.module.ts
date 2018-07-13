import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WebboardDetailPage } from './webboard-detail';

@NgModule({
  declarations: [
    WebboardDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(WebboardDetailPage),
    TranslateModule.forChild(),
    LazyLoadImageModule,
  ],
})
export class WebboardDetailPageModule {}
