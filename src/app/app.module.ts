import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { GoogleMaps } from '@ionic-native/google-maps';

import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';

import { TabsPage } from '../pages/tabs/tabs';
import { InicioPage } from '../pages/inicio/inicio';
import { LugaresPage} from '../pages/lugares/lugares';
import { NotificacionesPage} from '../pages/notificaciones/notificaciones';
import { AjustesPage } from '../pages/ajustes/ajustes';
import { InvitarPage } from '../pages/invitar/invitar';
import { InfolocalPage } from '../pages/infolocal/infolocal';
import { CartolaPage } from '../pages/cartola/cartola';


@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    LoginPage,
    TabsPage,
    InicioPage,
    LugaresPage,
    NotificacionesPage,
    AjustesPage,
    InvitarPage,
    CartolaPage,
    InfolocalPage   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    LoginPage,
    TabsPage,
    InicioPage,
    LugaresPage,
    NotificacionesPage,
    AjustesPage,
    InvitarPage,
    CartolaPage,
    InfolocalPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
