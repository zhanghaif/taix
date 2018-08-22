import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HttpServerProvider } from '../../providers/http-server/http-server';
import { StorageProvider } from '../../providers/storage/storage';
import { ToolsProvider } from '../../providers/tools/tools';
import { JPush } from '@jiguang-ionic/jpush';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //登录结构
  public user = { "Name" : null, "Passwd" : null,"LoginDevice":"0" }

  public flag = false;

  //设备id
  public registrationId = "0";
 
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public httpServers:HttpServerProvider,
    public tools: ToolsProvider,
    public storage: StorageProvider,
    public jpush: JPush) {

  }
  // ionViewDidLoad() {
  //   this.getRegistrationID();
  // }

  login(){

    // this.jpush.getRegistrationID().then(rId => {
      this.userinfo("rId");
      // alert(this.registrationId)
    // });

  }
  userinfo(rId){

    if(this.user.Name==null || this.user.Passwd==null){
      alert("用户名或密码不允许为空！");
      return
    }
    this.user.LoginDevice=rId;
    console.log(JSON.stringify(this.user));
    this.httpServers.doLogin("/login/user",this.user,(data)=>{

      let loading = this.loadingCtrl.create({
        content: '正在登录中...'
      });
      
      if(data.status=="201"){
        data = data.json()
        loading.present();
        this.storage.set('userinfo',data);
        this.getUserId(data);
        loading.dismiss();
      }else{
        alert("用户名或密码错误！");
        return
      }
      
      this.navCtrl.setRoot(HomePage);
      // this.loading();
    })
    
  }

  getUserId(token){
    let that = this;
    this.httpServers.requestData(that.flag,'/users/token',token,function(data){
      that.storage.set('DriverId',data.Id);
      that.storage.set('state',data.State);
      that.getDriverId(token,data.Id);
    });
    
  }
  getDriverId(token,id){
    // let that = this;
    let api="/orders/?query=DriverId.Id:"+id;
    this.httpServers.requestData(this.flag,api,token,function(data){
      console.log(data);
      
    });
  }

  //获取设备id
  getRegistrationID() {
    this.jpush.getRegistrationID().then(rId => {
      this.registrationId = rId;
      console.log(this.registrationId+"===========");
    });
  }
 
}
