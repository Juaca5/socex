import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


import { InicioPage } from '../inicio/inicio';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('rut') rut;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  onClickAcceder(){
    if(this.rut.value == "17712097-9"){
      this.navCtrl.push(TabsPage);
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Usuario Incorrecto',
        subTitle: 'El Rut Engresado no es valido.',
        buttons: ['Aceptar']
      });
      alert.present();
      }
    }
}
