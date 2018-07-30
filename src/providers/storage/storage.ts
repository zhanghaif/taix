// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor() {
    console.log('Hello StorageProvider Provider');
  }

  set(key,value){
    localStorage.setItem(key,JSON.stringify(value)); 
  }

  get(key){
    return JSON.parse(localStorage.getItem(key));
  }

  remove(key){
    localStorage.removeItem(key);
  }

  clear(){
    localStorage.clear();
  }
  
}
