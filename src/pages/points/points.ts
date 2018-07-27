import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

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

  public config : Config;
  public columns : any;
  public rows : any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _HTTP: HttpClient) {

    this.columns = [
        { name: 'fecha' },
        { name: 'cuenta' },
        { name: 'pago' },
        { name: 'pesos' },
        { name: 'saldo' }
      ];
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartolaPage');
    this.selectedLocal = this.navParams.get('local');

    this._HTTP
      .get<Config>('../../assets/data/cartola.json')
      .subscribe((data) =>
      {
         this.rows = data.cartola;
      });
  }
}
