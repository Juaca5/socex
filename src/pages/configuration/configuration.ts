import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { UserData } from '../../providers/user-data';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App, public userData: UserData) {  	
    this.user = userData.getUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigurationPage');
  }

  logout(){
    //Api Token Logout 
    const root = this.app.getRootNav();
    root.popToRoot();
  }

}
