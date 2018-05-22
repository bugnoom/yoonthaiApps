import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryPage } from './category';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    CategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryPage),
    LazyLoadImageModule,
    ComponentsModule,
  ],
})
export class CategoryPageModule {}
