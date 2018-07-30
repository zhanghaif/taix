import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpServerProvider } from '../../providers/http-server/http-server';
import { ToolsProvider } from '../../providers/tools/tools';
import { ListinfoPage} from '../listinfo/listinfo'
import { HomePage } from '../home/home';
/**
 * Generated class for the ProgressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-progress',
  templateUrl: 'progress.html',
})
export class ProgressPage {

  public item = {
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
    
    "Departure": null,
    "Destination": null,
    "Id":null,
    "Number":null,//乘车人数
    "AcceptDate": null,
    "Price": null//价格
  }

  public flag = false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public httpServers: HttpServerProvider,
    public tools: ToolsProvider) {
    this.item=this.navParams.data.item
    console.log(this.item);
    
    // this.requestData();
  }

   //订单数据请求
   requestData(){
    var that=this;
    this.httpServers.requestData(that.flag,'/orders/'+that.item.Id,that.tools.getUserInfo(),function(data){
      that.item=data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProgressPage');
  }

  goListInfo(data){
    var that=this;
    let api = "/orders/state/"+data+"/2";
    this.httpServers.update(api,null,that.tools.getUserInfo(),(data) => {
      if(data.Code=="200"){
        this.navCtrl.setRoot(ListinfoPage);
      }else{
        alert("网络异常！");
      }
    })
    
  }

  update(){
    var that=this;
    let api = "/users/state/0";
    this.httpServers.update(api,null,that.tools.getUserInfo(),(data) => {
      if(data.Code=='200'){
        that.tools.set('state','待岗');
        this.navCtrl.setRoot(HomePage);
      }else{
        alert("出车失败，请检查网络！");
      }
    })

  }

  
}
