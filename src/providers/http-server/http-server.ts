
import { Injectable } from '@angular/core';
import { Http,Jsonp,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from "@angular/common/http";
// import {Observable} from "rxjs";
import { ConfigProvider } from '../config/config';
import { ToolsProvider } from '../tools/tools';

import { LoadingController } from 'ionic-angular';
/*
  Generated class for the HttpServerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServerProvider {
  

  constructor(public https : HttpClient,public http:Http,
    public jsonp:Jsonp,public config:ConfigProvider,
    public tools:ToolsProvider,public loadingCtrl: LoadingController) {
    // console.log('Hello HttpServerProvider Provider');
  }
  requestData(flag,apiUrl,userinfo,callback){
    //设置post请求header
    let user =new Headers({'token': userinfo});
    let loading = this.loadingCtrl.create({
      content: '正在加载中...'
    });
    if(flag){
      loading.present();
    }
    
    // headers.add（'Access-Control-Allow-Methods'，'GET，POST，OPTIONS，PUT，DELETE'）; 
    this.http.get(this.config.apiUrl+apiUrl,{headers:user}).subscribe(function(data){
      // console.log(data['_body']);
      
      callback(JSON.parse(data['_body']));
      loading.dismiss();
    },error =>{
      // console.log(error);
      callback(error);
      loading.dismiss();
    })
  }

  //post 提交数据
  doPost(apiUrl,json,userinfo,callback){
    
    //设置post请求header
    let user =new Headers({'token': userinfo});

    //api拼接
    let api=this.config.apiUrl+apiUrl;

    this.http.post(api,JSON.stringify(json),{headers:user}).subscribe(function(res){

      //callback返回方法
      callback(res.json());

    },error =>{
      callback(error);
    })
  }

  update(apiUrl,json,userinfo,callback){
    //put请求需要降低浏览器安全性
    //open -n /Applications/Google\ Chrome.app/ --args --disable-web-security --user-data-dir=/Users/zhanghaifeng/Documents/mychrome
    //设置put请求header
    var headers = new Headers();
    headers.append('token', userinfo);
    //  let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    //api拼接
    let api=this.config.apiUrl+apiUrl;
    this.http.put(api,null,options).subscribe(res => {   
      // console.log(res);
       //callback返回方法
       callback(res.json());
    },error => {
      callback(error);
    })

  }

  //post 登录
  doLogin(apiUrl,json,callback){

    //api拼接
    let api=this.config.loginUrl+apiUrl;

    this.http.post(api,JSON.stringify(json)).subscribe(function(res){

      //callback返回方法
      callback(res);

    },function (error){
      callback(false);
      // console.log(error);

    })

  }

}
