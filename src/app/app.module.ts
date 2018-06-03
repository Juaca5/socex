import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { Welcome } from '../pages/welcome/welcome';
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { ConfirmationPage } from '../pages/confirmation/confirmation';
import { ContactPage } from '../pages/contact/contact';

import { HomePage } from '../pages/home/home';
import { PlacePage } from '../pages/place/place';
import { NotificationPage } from '../pages/notification/notification';
import { ConfigurationPage } from '../pages/configuration/configuration';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { FilterLocalesrPipe } from '../pages/place/place'; 
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
    NotificationPage,
    ConfigurationPage,
    TabsPage,
    FilterLocalesrPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
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
    NotificationPage,
    ConfigurationPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalesData,
    UserData,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
