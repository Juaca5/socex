import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html'
})
export class ConfirmationPage {

  constructor(public navCtrl: NavController) {

  }

  signup(){
    this.navCtrl.push(TabsPage);
  }

}
