import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { Network } from '@ionic-native/network';

import { MyApp } from './app.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { Welcome } from '../pages/welcome/welcome';
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { ConfirmationPage } from '../pages/confirmation/confirmation';
import { ContactPage } from '../pages/contact/contact';

import { HomePage } from '../pages/home/home';
import { PlacePage } from '../pages/place/place';
import { NotificationPage } from '../pages/notification/notification';
import { ConfigurationPage } from '../pages/configuration/configuration';
import { InfolocalPage } from '../pages/infolocal/infolocal';

import { PointsPage } from '../pages/points/points';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { FilterNotificationsPipe } from '../pages/notification/notification'; 
import { FilterLocalesrPipe } from '../pages/place/place'; 
import { NotificationsData } from '../providers/notifications-data';
import { InvitationsData } from '../providers/invitations-data';
import { LocalesData } from '../providers/locales-data';
import { UserData } from '../providers/user-data';

@NgModule({
  declarations: [
    MyApp,
    Welcome,
    Login,
    Signup,
    ConfirmationPage,
    ContactPage,
    HomePage,
    PlacePage,
    PointsPage,
    InfolocalPage,
    NotificationPage,
    ConfigurationPage,
    TabsPage,
    FilterLocalesrPipe,
    FilterNotificationsPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    NgxDatatableModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Welcome,
    Login,
    Signup,
    ConfirmationPage,
    ContactPage,
    HomePage,
    PlacePage,
    InfolocalPage,
    PointsPage,
    NotificationPage,
    ConfigurationPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NotificationsData,
    InvitationsData,
    LocalesData,
    UserData,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
