import { Component } from '@angular/core';
// import { DomSanitizer } from '@angular/platform-browser';  
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
// import { ProgressPage } from '../progress/progress';
import { HttpServerProvider } from '../../providers/http-server/http-server';
import { ToolsProvider } from '../../providers/tools/tools';
import { ListinfoPage } from '../listinfo/listinfo';
import { ListenerPage } from '../listener/listener';

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  public items = [{
    "CarId": {//车辆
      "Id": null
    },
    "CompanyId": {//公司
      "Id": null
    },
    "DispatcherId": {//派车人
      "Id": 0,
      "Name": null,
      "Phone": null
    },
    "PassagerId": {//乘车人
      "Id": 0,
      "Name": null,
      "Phone": null
    },
    "DriverId": {//司机
      "Id": null
    },
    "DriverFeedback":null,
    "Departure": null,
    "Destination": null,
    "Number":null,//乘车人数
    "AcceptDate": null,
    "Price": null//价格
  }]

  public ListinfoPage=ListinfoPage;
  public phone : any;  
  public msg=null;
  public flag = false;
  constructor(private alertCtrl: AlertController,
    private sms: SMS,
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpServers: HttpServerProvider,
    public tools: ToolsProvider) {
    this.requestData();
  }
  //订单数据请求
  requestData(){
    var that=this;
    let api="/orders/?query=DriverId.Id:"+that.tools.get("DriverId")+",State:待处理";
    this.httpServers.requestData(true,api,that.tools.getUserInfo(),function(data){
      
      if(data){
        let res = [];
        data.forEach(element => {
          if(element.DriverFeedback!="已拒单"){
            res.push(element);
          }
        });
        that.items=res;
        if(that.items.length>0){
          that.msg = null
        }else{
          that.msg = "暂无订单信息！"
        }
        
      }else{
        that.msg = "暂无订单信息！"
      }
      
      // that.phone=data.PassagerId.Phone
      // console.log(that.safeUrl);
      // console.log(data.PassagerId.Name);bypassSecurityTrustUrl  bypassSecurityTrustScript
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }

  update(data){
    var that=this;
    
    data.forEach(element => {
      let api = "/orders/state/"+element.Id+"/1";
      this.httpServers.update(api,null,that.tools.getUserInfo(),(data) => {
        console.log(data);
      })

      // let apiPush = "/push/tooperator/"+element.Id;
      // this.httpServers.requestData(this.flag,apiPush,that.tools.getUserInfo(),data=>{
      //   console.log(apiPush);
      //   console.log(JSON.stringify(data) );
      // });
       
    });
    this.navCtrl.setRoot(ListinfoPage);
  }

  cancel(data){
    var that=this;
    data.forEach(element => {
      // console.log(element.Id);
      let api = "/orders/state/"+element.Id+"/0";
      this.httpServers.update(api,null,that.tools.getUserInfo(),(data) => {
        this.presentAlert("成功取消订单");
        this.navCtrl.setRoot(ListenerPage);
      })
    });
  }

  goListinfo(){
    this.navCtrl.setRoot(ListinfoPage);
  }

  //弹出框
  presentAlert(content) {
    let alert = this.alertCtrl.create({
      title: "提示信息",
      subTitle: content,
      buttons: ['确定']
    });
    alert.present();
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: '发送短信',
      inputs: [
        {
          name: 'sms',
          placeholder: '输入短信内容'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '发送',
          handler: data => {
            // console.log(this.phone+data.sms);
            this.sms.send(this.phone, data.sms);
           
          }
        }
      ]
    });
    alert.present();
  }

}
