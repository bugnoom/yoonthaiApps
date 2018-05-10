import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbProvider {

  userlogedin : boolean = false;

  constructor(public http: HttpClient) {
    console.log('Hello DbProvider Provider');
  }

}
