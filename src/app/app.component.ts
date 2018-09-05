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
import { Geolocation } from '@ionic-native/geolocation';
import { AndroidPermissions } from '@ionic-native/android-permissions';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = this.getVerification();

  devicePlatform: string;


  GPS = {
    PI : 3.14159265358979324,
    x_pi : 3.14159265358979324 * 3000.0 / 180.0,
    delta : function (lat, lon) {
        // Krasovsky 1940
        //
        // a = 6378245.0, 1/f = 298.3
        // b = a * (1 - f)
        // ee = (a^2 - b^2) / a^2;
        var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
        var ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
        var dLat = this.transformLat(lon - 105.0, lat - 35.0);
        var dLon = this.transformLon(lon - 105.0, lat - 35.0);
        var radLat = lat / 180.0 * this.PI;
        var magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        var sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI);
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI);
        return {'lat': dLat, 'lon': dLon};
    },

    //GPS---高德
    gcj_encrypt : function ( wgsLat , wgsLon ) {
        if (this.outOfChina(wgsLat, wgsLon))
            return {'lat': wgsLat, 'lon': wgsLon};

        var d = this.delta(wgsLat, wgsLon);
        return {'lat' : wgsLat + d.lat,'lon' : wgsLon + d.lon};
    },
    gpstogd_lat : function(wgsLat,wgsLon){
      if (this.outOfChina(wgsLat, wgsLon))
      return  wgsLat;

      var d = this.delta(wgsLat, wgsLon);
      return  wgsLat + d.lat;
    },
    gpstogd_lon : function(wgsLat,wgsLon){
      if (this.outOfChina(wgsLat, wgsLon))
      return  wgsLon;

      var d = this.delta(wgsLat, wgsLon);
      return  wgsLon + d.lon;
    },
    outOfChina : function (lat, lon) {
        if (lon < 72.004 || lon > 137.8347)
            return true;
        if (lat < 0.8293 || lat > 55.8271)
            return true;
        return false;
    },
    transformLat : function (x, y) {
        var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
        return ret;
    },
    transformLon : function (x, y) {
        var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
        return ret;
      }
  };

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
    public geolocation :Geolocation,
    public httpServers: HttpServerProvider,
    private androidPermissions: AndroidPermissions,
    // private backgroundMode: BackgroundMode,
    jpush: JPush, device: Device) {
      // this.backgroundMode.enable();
      // this.backgroundMode.disableWebViewOptimizations();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      jpush.init();
      jpush.setDebugMode(true);
      this.devicePlatform = device.platform;


      //启用后台模式。一旦被调用，阻止应用程序在后台暂停 disable关闭
    //   document.addEventListener('deviceready', function () {
    //     // cordova.plugins.backgroundMode is now available
        
    //     this.cordova.plugins.backgroundMode.enable();
    //     this.cordova.plugins.backgroundMode.setEnabled(true);
    //     // this.backgroundMode.disableWebViewOptimizations();

    //   }, false);
      
      
      // jpush.getRegistrationID().then(rId => {
      //   // this.registrationId = rId;
      //   // console.log(rId);
      //   this.tools.set("registrationId",rId);
      //   // return rId;
      // });

      document.addEventListener('jpush.openNotification', (event: any) => {
        this.rootPage=OrdersPage
      })
      //获取设备位置权限
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        result => console.log('Has permission?',result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
      );

      geolocation.watchPosition().subscribe(pos => {
        console.log("********************");
        if(this.tools.get("state")=='在岗' && this.tools.getUserInfo()!= null){
          this.entity=this.getCar();
          this.entity.Angle=pos.coords.heading;
          this.entity.Lat=this.GPS.gpstogd_lat(pos.coords.latitude,pos.coords.longitude);
          this.entity.Lng=this.GPS.gpstogd_lon(pos.coords.latitude,pos.coords.longitude);
          console.log(JSON.stringify(this.entity));
          if(this.entity.CarNum != null ){
            console.log(JSON.stringify(this.entity));
            this.driverupload(this.entity);
          }
        }
        
      })
      // watch.unsubscribe();

    });
    
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
      console.log(data);
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

