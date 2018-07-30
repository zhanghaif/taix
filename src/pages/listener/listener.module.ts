import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListenerPage } from './listener';

@NgModule({
  declarations: [
    ListenerPage,
  ],
  imports: [
    IonicPageModule.forChild(ListenerPage),
  ],
})
export class ListenerPageModule {}
