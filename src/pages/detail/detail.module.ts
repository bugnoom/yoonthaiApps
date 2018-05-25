import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailPage } from './detail';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ComponentsModule } from './../../components/components.module';


@NgModule({
  declarations: [
    DetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailPage),
    ComponentsModule,
    LazyLoadImageModule,
  
  ],
  exports:[
    DetailPage
  ]
})
export class DetailPageModule {}
