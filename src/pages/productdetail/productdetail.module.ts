import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductdetailPage } from './productdetail';

@NgModule({
  declarations: [
    ProductdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductdetailPage),
    TranslateModule.forChild(),
  ],
})
export class ProductdetailPageModule {}
