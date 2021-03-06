import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { Login } from '../login/login';
import { Signup } from '../signup/signup';
/**
 * Generated class for the Welcome page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class Welcome {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Welcome');
  }

  login(){
   this.navCtrl.setRoot(Login);
  }

  signup(){
   this.navCtrl.setRoot(Signup, {}, {animate:false});
  }

  NoFuntion(){
    let alert = this.alertCtrl.create({
      title: 'Función no disponible',
      subTitle: 'Esta funcionalidad aún no está disponible',
      buttons: ['Aceptar']
    });
    alert.present();
  }

}
