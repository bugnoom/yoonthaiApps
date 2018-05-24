
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { TranslateModule } from '@ngx-translate/core';
import { LazyLoadImageModule } from 'ng-lazyload-image';



@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    TranslateModule.forChild(),
    LazyLoadImageModule,
  ],
  exports:[
    HomePage
  ]
})
export class HomePageModule {}
