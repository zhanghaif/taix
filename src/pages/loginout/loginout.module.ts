import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginoutPage } from './loginout';

@NgModule({
  declarations: [
    LoginoutPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginoutPage),
  ],
})
export class LoginoutPageModule {}
