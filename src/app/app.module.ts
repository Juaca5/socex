import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { Network } from '@ionic-native/network';
import { StatusBar } from '@ionic-native/status-bar'; 
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
/*
 * pages when the application starts
 * |--- welcome 
 *     |--- login 
 * |--- confirmation (code)
 */
import { Welcome } from '../pages/welcome/welcome';
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { ConfirmationPage } from '../pages/confirmation/confirmation';
/* 
 * Pages link home
 * |--- home
 *     |--- customer support (modal page)
 *     |--- contact friends (modal page)
 */
import { HomePage } from '../pages/home/home';
import { CustomersupportPage } from '../pages/customersupport/customersupport';
//import { ContactfriendsPage } from '../pages/contactfriends/contactfriends';
/*
 * pages link place
 * |--- place --- filter local
 *     |--- points (modal page)
 *     |--- contact (modal page, send from)
 *     |--- info local (modal page)
 */
import { PlacePage } from '../pages/place/place';
import { FilterLocalesrPipe } from '../pages/place/place'; 
import { PointsPage } from '../pages/points/points';
import { ContactPage } from '../pages/contact/contact';
import { InfoPage } from '../pages/info/info';
import { ListplacePage } from '../pages/listplace/listplace';
/*
 * pages link notify
 * |--- notification -- filter notify
 */
import { NotificationPage } from '../pages/notification/notification';
import { FilterNotificationsPipe } from '../pages/notification/notification';
/*
 * page link config
 * |--- config
 */
import { ConfigurationPage } from '../pages/configuration/configuration';
/* 
 * tabs navegation
 * |--- tabs
 */
import { TabsPage } from '../pages/tabs/tabs';
/*
 * proiders
 * |--- user
 * |--- locales
 * |--- notifications
 * |--- invitation 
 */
import { UserData } from '../providers/user-data';
import { LocalesData } from '../providers/locales-data';
import { NotificationsData } from '../providers/notifications-data';
import { InvitationsData } from '../providers/invitations-data';


@NgModule({
  declarations: [
    MyApp,
    Welcome,
    Login,
    Signup,
    ConfirmationPage,
    ContactPage,
    HomePage,
    InfoPage,
    PlacePage,
    PointsPage,
    ListplacePage,
    NotificationPage,
    ConfigurationPage,
    //ContactfriendsPage,
    CustomersupportPage,
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
    InfoPage,
    ConfirmationPage,
    ContactPage,
    HomePage,
    //ContactfriendsPage,
    CustomersupportPage,
    PlacePage,
    PointsPage,
    ListplacePage,
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
