import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListinfoPage } from './listinfo';

@NgModule({
  declarations: [
    ListinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListinfoPage),
  ],
})
export class ListinfoPageModule {}
