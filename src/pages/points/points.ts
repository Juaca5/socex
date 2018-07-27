import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PlacePage } from '../place/place';
import { ListplacePage } from '../listplace/listplace';
import { UserData } from '../../providers/user-data';

export interface Config {
	technologies: string;
}

@IonicPage()
@Component({
  selector: 'page-points',
  templateUrl: 'points.html',
})
export class PointsPage {

  selectedLocal: any = {};
  myDate: String = new Date().toISOString();
  today: any;

  public config : Config;
  public columns : any;
  public rows : any;


  constructor(
    public invitationsData: UserData, 
    public navCtrl: NavController, 
    public navParams: NavParams) {

    this.today = new Date();
    this.columns = [
        { name: 'Fecha' },
        { name: 'Cuenta' },
        { name: 'Pago' },
        { name: 'Pesos' },
        { name: 'Saldo' }
      ];
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartolaPage');
    this.selectedLocal = this.navParams.get('local');
    this.today = new Date();
    this.rows = this.selectedLocal.cartola;
  }

  currency(saldo){
    if(!saldo){
      return '$0';
    }
    let resto = saldo;
    let number = '$';
    if(saldo >= 1000000){
      resto = Math.trunc(saldo / 1000000)
      number += resto+'.';
    }
    if(saldo >= 1000){
      resto = Math.trunc(saldo / 1000000)
      number += resto+'.';
    }
    return number;
  }


  LocalDetails() {
    this.navCtrl.setRoot(ListplacePage, {
      local: this.selectedLocal
    });
  }


  backToPlace(){
    this.navCtrl.setRoot(PlacePage);    
  }

}
