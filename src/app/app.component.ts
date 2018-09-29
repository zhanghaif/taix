import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { JPush } from '@jiguang-ionic/jpush';
import { Device } from '@ionic-native/device';
// import { BackgroundMode } from '@ionic-native/background-mode';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ListenerPage } from '../pages/listener/listener';
// import { ProgressPage } from '../pages/progress/progress';
import { StorageProvider } from '../providers/storage/storage';
import { OrdersPage } from '../pages/orders/orders';

import { HttpServerProvider } from '../providers/http-server/http-server';
import { ToolsProvider } from '../providers/tools/tools';
// import { Geolocation } from '@ionic-native/geolocation';
import { AndroidPermissions } from '@ionic-native/android-permissions';

declare var BMap; 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = this.getVerification();

  devicePlatform: string;

  public entity={
    "Angle": 0,
    "CarModel": null,
    "CarNum": null,
    "Content": null,
    "DriverName": null,
    "Lat": 0,
    "Level": null,
    "Lng": 0,
    "Mark": null,
    "State": null
  }
  
  public flag = false;

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public tools: ToolsProvider,
    public storage: StorageProvider, 
    // public geolocation :Geolocation,
    public httpServers: HttpServerProvider,
    private androidPermissions: AndroidPermissions,
    jpush: JPush, device: Device) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      jpush.init();
      jpush.setDebugMode(true);
      this.devicePlatform = device.platform;
      

      document.addEventListener('jpush.openNotification', (event: any) => {
        this.rootPage=OrdersPage
      })
      //获取设备位置权限
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        result => console.log('Has permission?',result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
      );

      
      setInterval(() => {
        if(this.tools.get("state")=='在岗' && this.tools.getUserInfo()!= null){
          var that = this;
          var geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition(function(r){
            that.entity=that.getCar();
            var p = that.Convert_BD09_To_GCJ02(r.point.lat,r.point.lng);
            that.entity.Angle=r.heading;
            that.entity.Lat=p.lat;
            that.entity.Lng=p.lng;
            // console.log("位置信息："+JSON.stringify(that.entity));
            if(that.entity.CarNum != null ){
              // console.log(JSON.stringify(that.entity));
              that.driverupload(that.entity);
            }
          },{
            enableHighAccuracy: true
          })
        }
      }, 5000);
      

    });
    
  }
  Convert_BD09_To_GCJ02(lat, lng)	{	
    var x_pi = 3.14159265358979324 * 3000.0 / 180.0;		
    var x = lng - 0.0065;		
    var y = lat - 0.006;		
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);		
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);		
    lng = z * Math.cos(theta);		
    lat = z * Math.sin(theta);		
    return {"lat":lat,"lng":lng};	
  }
  
  getCar(){
    let num=0;
      this.httpServers.requestData(this.flag,'/orders/?query=State:进行中',this.tools.getUserInfo(),data=>{
        
        if(data){
          this.entity.CarModel=data[0].CarId.Model
          this.entity.CarNum=data[0].CarId.Carnum;
          
          this.entity.DriverName=data[0].DriverId.Name;
          this.entity.Level=data[0].CarId.Level;
          this.entity.State="进行中";
          data.forEach(element => {
            num += element.Number
          });
          this.entity.Content=num+"/"+data[0].CarId.ContentNum;
        }else{
          this.httpServers.requestData(this.flag,'/car_driver/?query=DriverId.Id:'+this.tools.get("DriverId"),this.tools.getUserInfo(),data=>{
            if(data){
              this.entity.CarModel=data[0].CarId.Model
              this.entity.CarNum=data[0].CarId.Carnum;
              this.entity.Content=0+"/"+data[0].CarId.ContentNum;
              this.entity.DriverName=data[0].DriverId.Name;
              this.entity.Level=data[0].CarId.Level;
              this.entity.State="空闲中";
            }
            
          })
        }
        
      })
      return this.entity
  }
  driverupload(entity){
    this.httpServers.doPost('/push/driverupload',entity,this.tools.getUserInfo(),data =>{
      // console.log(data);
    })
  }

  getVerification(){
    
    if(this.storage.get("userinfo")){

      if(this.storage.get("state")){
        return this.getState();
        
      }

      return HomePage

    }else{

      return LoginPage

    }
  }

  getState(){
    
    if(this.storage.get("state")=='待岗'){

      return HomePage//未出车

    }else if (this.storage.get("state")=='在岗') {

      return ListenerPage //听单中
    }
  }
}

