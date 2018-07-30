import { Component } from '@angular/core';
import { NavController,ActionSheetController, LoadingController } from 'ionic-angular';
// import { LoginPage } from '../login/login';
import { ListenerPage } from '../listener/listener';
// import { NativeAudio } from '@ionic-native/native-audio';
// import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
// import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification'
import { JPush } from '@jiguang-ionic/jpush';
import { HttpServerProvider } from '../../providers/http-server/http-server';
import { ToolsProvider } from '../../providers/tools/tools';
import { LoginPage } from '../login/login';

// import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //出车状态 0:未出车，1:已出车
  public status: any='0';
  
  public flag = false;

  

  constructor(public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public httpServers: HttpServerProvider,
    public localNotification :PhonegapLocalNotification,
    // private geolocation: Geolocation,
    public jpush:JPush,
    public tools: ToolsProvider) {
    this.status=0;
    // jpush.stopPush();
  }

  goListener(){

    //更新司机状态
    var that=this;
    let api = "/users/state/1";
    
    this.httpServers.update(api,null,that.tools.getUserInfo(),(data) => {
      // console.log(data);
      if(data.Code=='200'){
        // console.log(200);
        that.tools.set('state','在岗');
        this.navCtrl.setRoot(ListenerPage);
      }else{
        
        that.getStatus(data.status);
      }
      
    })
    
  }
  

  driverupload(entity){
    this.httpServers.doPost('/push/driverupload',entity,this.tools.getUserInfo(),data =>{
      console.log(data);
      
    })
  }
  onSuccess(){
    console.log("success");
    
  }
  onError(error){
    console.log(error);
    
  }
  getStatus(status){
    if(status=="401"){
      alert("登录失效，请重新登录！");
      this.tools.clear();
      this.navCtrl.setRoot(LoginPage);
    }
  }
  loginOut() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '退出后不会删除任何历史数据，下次登录依然可以使用本帐号',
      buttons: [
        {
          text: '退出登录',
          role: 'destructive',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: '正在注销用户信息...'
            });
            loading.present();
           
            this.navCtrl.setRoot(LoginPage);
            this.tools.clear();
            loading.dismiss();
           
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }
}
