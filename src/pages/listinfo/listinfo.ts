import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';

import { HttpServerProvider } from '../../providers/http-server/http-server';
import { ToolsProvider } from '../../providers/tools/tools';
import { ProgressPage } from '../progress/progress';
import { ListenerPage } from '../listener/listener';

/**
 * Generated class for the ListinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listinfo',
  templateUrl: 'listinfo.html',
})
export class ListinfoPage {

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
   
    "Departure": null,
    "Destination": null,
    
    "Number":null,//乘车人数
    "Date": null,
    "Price": null//价格
  }]
  //显示条数
  public limit : number = 10;

  //数据初始位置
  public offset : number = 0;

  //下一个数据位置
  public page : number =0;

  public msg : any;

  //提示信息
  public message :string = "";
  // public ListenerPage=ListenerPage;
  public flag = true;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public httpServers: HttpServerProvider,
    public loadingCtrl: LoadingController,
    public tools: ToolsProvider) {
    this.requestData(null);
  }

 goListener(){
   this.navCtrl.setRoot(ListenerPage)
 }
 //订单数据请求
 requestData(infiniteScroll){
    var that=this;
    let api="/orders/?query=DriverId.Id:"+that.tools.get("DriverId")+"&sortby=AppointDate&order=desc"//+"&order=State";
    this.httpServers.requestData(that.flag,api,that.tools.getUserInfo(),function(data){

      if(data){
        let res = [];
        data.forEach(element => {
          if(element.State!='待处理'){
            res.push(element);
          }
        });
         //拼接数据结果集
        // that.items=that.items.concat(data);
        that.items=res;
        if(that.items.length>0){
          that.msg = null
        }else{
          that.msg = "暂无订单信息！"
        }
        
       
      }else{
        if(data==null){
          that.msg = "暂无订单信息！"
        }else{
          alert("请求错误，请检查网络！");
          return
        }
        
      }

      // //下一个起始位置
      // that.offset=that.limit+that.page;

      // //下一个起始位置
      // that.page=that.offset;

      // //上拉刷新
      // if(infiniteScroll){

      //   infiniteScroll.complete();

      //   if(data==null){

      //     that.message = "我是有底线的";
      //     infiniteScroll.enable(false);

      //   }
      // }
     
    });
  }
  // getStatus(status){
  //   if(status=="401"){
  //     alert("登录失效，请重新登录！");
  //     this.navCtrl.setRoot(LoginPage);
  //   }else{
  //     alert("请求错误，请检查网络！");
  //   }
  // }

  //下拉刷新
  doRefresh(refresher) {
    this.offset=0;
    this.page = 0;
    this.items=[];
    this.requestData(null)
    refresher.complete();
  }

  goProgress(data){
    console.log(data.Id);
    console.log("data");
    this.navCtrl.push(ProgressPage,{
      item:data
    })
  }
  
}
