import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrdersPage } from '../orders/orders';
import { HomePage } from '../home/home';
import { ListinfoPage } from '../listinfo/listinfo';
import { JPush } from '@jiguang-ionic/jpush';
import { Device } from '@ionic-native/device';
import { HttpServerProvider } from '../../providers/http-server/http-server';
import { ToolsProvider } from '../../providers/tools/tools';
import { LoginPage } from '../login/login';
// import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the ListenerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listener',
  templateUrl: 'listener.html',
})
export class ListenerPage {

 

  // public LoginoutPage = LoginoutPage
  public ListinfoPage = ListinfoPage;
  // providers: LoginoutPage;
  devicePlatform: string;

  public flag = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, public jpush: JPush, 
    // public geolocation :Geolocation,
    device: Device,public httpServers: HttpServerProvider,
    public tools: ToolsProvider
  ) {
    this.devicePlatform = device.platform;
    document.addEventListener('jpush.receiveNotification', (event: any) => {
      this.navCtrl.setRoot(OrdersPage);
    }, false);
  }



  ionViewDidEnter(){
    var interval=setInterval(() => {

      if(this.tools.get("state")=='在岗'){
        // console.log("请求是否存在订单信息");
        
        this.getOrders(interval);
      }
        // this.getPosition();
    }, 10000);
  }
  getOrders(interval){
    var that=this;
    var items=[];
    let api="/orders/?query=DriverId.Id:"+that.tools.get("DriverId")+",State:待处理";
    this.httpServers.requestData(that.flag,api,that.tools.getUserInfo(),function(data){
      if(data){
        let res = [];
        data.forEach(element => {
          if(element.DriverFeedback!="已拒单"){
            res.push(element);
          }
        });
        items=res;
        if(items.length>0){
          clearInterval(interval);
          that.navCtrl.setRoot(OrdersPage);
        }
      }
    });
  }

  goOrders(){
    this.navCtrl.setRoot(OrdersPage);
  }

  goListInfo(){
    this.navCtrl.setRoot(ListinfoPage);
  }

  update(){
    var that=this;
    let api = "/users/state/0";
    
    this.httpServers.update(api,null,that.tools.getUserInfo(),(data) => {
      if(data.Code=='200'){
        // console.log(200);
        that.tools.set('state','待岗');
        this.navCtrl.setRoot(HomePage);
      }else{
        that.getStatus(data.status);
        // alert("出车失败，请检查网络！");
      }
    })

  }
  getStatus(status){
    if(status=="401"){
      alert("登录失效，请重新登录！");
      this.navCtrl.setRoot(LoginPage);
    }
  }
}
