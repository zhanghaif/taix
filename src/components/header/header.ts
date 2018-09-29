import { Component } from '@angular/core';
import {  NavController, NavParams,ActionSheetController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { ToolsProvider } from '../../providers/tools/tools';
/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  text: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public tools: ToolsProvider) {
    console.log('Hello HeaderComponent Component');
    this.text = 'Hello World';
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
