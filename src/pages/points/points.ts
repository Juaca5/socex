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

  public config : Config;
  public columns : any;
  public rows : any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _HTTP: HttpClient) {

      this.columns = [
        { prop: 'Fecha' },
        { name: 'Cuenta' },
        { name: 'Pago' },
        { name: 'Pesos' },
        { name: 'Saldo' },
      ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartolaPage');
    this.selectedLocal = this.navParams.get('local');
    this._HTTP
      .get<Config>('../../assets/data/techologies.json')
      .subscribe((data) =>
      {
         this.rows = data.technologies;
      });
  }

}
