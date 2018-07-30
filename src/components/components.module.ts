import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header';
import { WarmtipsComponent } from './warmtips/warmtips';

//引用ionicmodule识别ion标签
import { IonicModule } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
	declarations: [
		HeaderComponent,
    WarmtipsComponent],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		IonicModule
	],
	exports: [HeaderComponent,
    WarmtipsComponent]
})
export class ComponentsModule {}
