import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { NativeAudio } from '@ionic-native/native-audio';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { PhonegapLocalNotification } from '@ionic-native/phonegap-local-notification'
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { OrdersPage } from '../pages/orders/orders';
import { ProgressPage } from '../pages/progress/progress';
import { ListenerPage } from '../pages/listener/listener';
import { ConfigProvider } from '../providers/config/config';
import { HttpServerProvider } from '../providers/http-server/http-server';
import { LoginoutPage } from '../pages/loginout/loginout';
import { StorageProvider } from '../providers/storage/storage';
import { ToolsProvider } from '../providers/tools/tools';
import { ListinfoPage } from '../pages/listinfo/listinfo';

import { Device } from '@ionic-native/device';
import { JPush } from '@jiguang-ionic/jpush';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Autostart } from '@ionic-native/autostart';
import { BackgroundMode } from '@ionic-native/background-mode';

// import { BackgroundFetch } from '@ionic-native/background-fetch';
// import { Geolocation } from '@ionic-native/geolocation';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { ComponentsModule } from '../components/components.module'



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    // LoginPage,
    // OrdersPage,
    // ProgressPage,
    // ListenerPage,
    // LoginoutPage,
    // ListinfoPage
    //ionic cordova build android --prod --release 打包注释
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    HttpClientModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    OrdersPage,
    ProgressPage,
    ListenerPage,
    LoginoutPage,
    ListinfoPage
  ],
  providers: [
    Camera,
    StreamingMedia,
    SpeechRecognition,
    PhonegapLocalNotification,
    NativeAudio,
    StatusBar,
    SplashScreen,
    Device,
    JPush,
    BackgroundGeolocation,
    Autostart,
    BackgroundMode,
    // BackgroundFetch,
    // Geolocation,
    AndroidPermissions,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigProvider,
    HttpServerProvider,
    StorageProvider,
    ToolsProvider
  ]
})
export class AppModule {}
