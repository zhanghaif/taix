import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WarmtipsPage } from './warmtips';

@NgModule({
  declarations: [
    WarmtipsPage,
  ],
  imports: [
    IonicPageModule.forChild(WarmtipsPage),
  ],
})
export class WarmtipsPageModule {}
