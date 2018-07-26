import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { Welcome } from '../welcome/welcome';

/**
 * Generated class for the ConfigurationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html',
})
export class ConfigurationPage {
	user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App, public userData: UserData, public toastCtrl: ToastController) {  	
    this.user = userData.getUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigurationPage');
  }

  logout(){
    this.userData.logout();
    this.navCtrl.setRoot(Welcome);
      const toast = this.toastCtrl.create({
        message:  'Sesión finalizada',
        position: 'top',
        duration: 3000
      });
      toast.present();
  }

}
