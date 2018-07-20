import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopPage } from './shop';


@NgModule({
  declarations: [
    ShopPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopPage),
    ComponentsModule    
  ],
})
export class ShopPageModule {}
