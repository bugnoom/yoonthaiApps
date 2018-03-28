import { LazyLoadImageModule } from 'ng-lazyload-image';
import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { PostlistComponent } from './postlist/postlist';
@NgModule({
	declarations: [PostlistComponent],
	imports: [IonicModule,LazyLoadImageModule],
	exports: [PostlistComponent]
})
export class ComponentsModule {}
