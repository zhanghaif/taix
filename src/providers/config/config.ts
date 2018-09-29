// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {

  //api文档
  //http://111.207.174.227:8888/swagger/

  //api请求地址
  public apiUrl : string = "http://39.106.173.211:8888/v1/api";

  //登陆请求地址
  public loginUrl : string = "http://39.106.173.211:8888/v1";

  constructor() {
    console.log('Hello ConfigProvider Provider');
  }

}
