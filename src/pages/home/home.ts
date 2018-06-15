import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { NotificationPage } from '../notification/notification';
import { ContactPage } from '../contact/contact';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public app: App) {

  }

  logout(){
    //Api Token Logout 
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  gotoNotification(){
    this.navCtrl.push(NotificationPage);
  }

  Invite(){
    this.navCtrl.push(ContactPage, {
    });
  }


}
