import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { InicioPage } from '../inicio/inicio';
import { LugaresPage } from '../lugares/lugares';
import { NotificacionesPage } from '../notificaciones/notificaciones';
import { AjustesPage } from '../ajustes/ajustes';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tabInicio = InicioPage;
  tabLugares = LugaresPage;
  tabNotificaciones = NotificacionesPage;
  tabAjustes = AjustesPage;

}
