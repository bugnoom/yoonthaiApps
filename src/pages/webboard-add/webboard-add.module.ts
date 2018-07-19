import { EmojiPickerModule } from '@ionic-tools/emoji-picker';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WebboardAddPage } from './webboard-add';

@NgModule({
  declarations: [
    WebboardAddPage,
  ],
  imports: [
    IonicPageModule.forChild(WebboardAddPage),
    TranslateModule.forChild(),
    EmojiPickerModule
  ],
})
export class WebboardAddPageModule {}
