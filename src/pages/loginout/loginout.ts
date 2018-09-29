import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ToolsProvider } from '../../providers/tools/tools';
import { HttpServerProvider } from '../../providers/http-server/http-server';

/**
 * Generated class for the LoginoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loginout',
  templateUrl: 'loginout.html',
})
export class LoginoutPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public httpServers: HttpServerProvider,
    public tools: ToolsProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginoutPage');
  }
  getLoginOut(){
    let api="/api/logout/"+this.tools.get("rId")
    this.httpServers.requestData(false,api,this.tools.getUserInfo(),function(data){
        console.log(data);

    })
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
            setTimeout(() => {
              this.getLoginOut();
              this.navCtrl.setRoot(LoginPage);
            }, 1000);
            setTimeout(() => {
              loading.dismiss();
            }, 1100);
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
