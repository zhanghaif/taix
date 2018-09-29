// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//配置文件
import { StorageProvider } from '../../providers/storage/storage';
/*
  Generated class for the ToolsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToolsProvider {

  constructor(public storage:StorageProvider) {
    console.log('Hello ToolsProvider Provider');
  }

  //获取用户信息
  getUserInfo(){

    var userinfo=this.storage.get('userinfo');

    if(userinfo){

      return userinfo;

    }else{
      
      return null;

    }
  }
  get(id){

    var data=this.storage.get(id);

    if(data){

      return data;

    }else{
      
      return null;

    }
  }

  removeUserinfo(){

    this.storage.remove("userinfo");

  }

  clear(){
    this.storage.clear();
  }

  set(name,value){
    this.storage.set(name,value);
  }
  //错误状态处理
  errorStatus(status){

    if(status=="404"){

      return "未找到指定页面，请联系管理员";
      
    }
  }

  //订单状态
  getState(state){

    if (state==0) {

      return "预约单";

    }else if(state==1){

      return "未指派";

    }else if(state==2){

      return "未接单";

    }else if(state==3){

      return "已接单";

    }else if(state==4){

      return "执行中";

    }else if(state==5){

      return "已完成";

    }else{

      return "";

    }
  }
}
