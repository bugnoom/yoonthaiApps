import { EmojiPickerModule } from '@ionic-tools/emoji-picker';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WebboardReplyPage } from './webboard-reply';

@NgModule({
  declarations: [
    WebboardReplyPage,
  ],
  imports: [
    IonicPageModule.forChild(WebboardReplyPage),
    TranslateModule.forChild(),
    EmojiPickerModule
  ],
})
export class WebboardReplyPageModule {}
