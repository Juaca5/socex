import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
	selectedLocal: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacePage');
    	this.selectedLocal = this.navParams.get('local');
  }
  backToPlace(){
  	this.showAlert();
  	this.navCtrl.pop();
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Invitación enviada!',
      subTitle: 'Una vez que tu amigo responda, recibiras una notificación con su repuesta!',
      buttons: ['Entendido']
    });
    alert.present();
  }

}
