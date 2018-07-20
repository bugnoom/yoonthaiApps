import { LazyLoadImageModule } from 'ng-lazyload-image';
import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

import { ProductloopComponent } from './productloop/productloop';

@NgModule({
	declarations: [ProductloopComponent],
	imports: [IonicModule, LazyLoadImageModule],
	exports: [ProductloopComponent]
})
export class ComponentsModule {}
