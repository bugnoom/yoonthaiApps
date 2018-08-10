import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopVariationPage } from './shop-variation';

@NgModule({
  declarations: [
    ShopVariationPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopVariationPage),
    TranslateModule.forChild(),
  ],
})
export class ShopVariationPageModule {}
