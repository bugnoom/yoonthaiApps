import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the I18nSwitcherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class I18nSwitcherProvider {

  private swtich: Subject<string> = new Subject();

  constructor() {
   
  }

  watch():Observable<string>{
    return this.swtich.asObservable();
  }

  switchLang(lang:string){
    if(lang != 'ko'){ lang = 'th'}
    this.swtich.next(lang);
  }

}
