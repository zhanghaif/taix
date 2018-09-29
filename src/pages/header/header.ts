import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ToolsProvider } from '../../providers/tools/tools';

/**
 * Generated class for the HeaderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-header',
  templateUrl: 'header.html',
})
export class HeaderPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public tools: ToolsProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HeaderPage');
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
