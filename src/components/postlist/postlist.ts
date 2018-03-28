import { Component, Input } from '@angular/core';


/**
 * Generated class for the PostlistComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'postlist',
  templateUrl: 'postlist.html'
})
export class PostlistComponent {

  @Input('data') data : any;
 
  

  constructor() {
    console.log('Hello PostlistComponent Component');
    console.log(this.data);
  }

 

}
