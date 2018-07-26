import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { NotificationPage } from '../notification/notification';
import { ContactPage } from '../contact/contact';

import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  notificationsLeft: Number = 0;

  constructor(
    public navCtrl: NavController, 
    public app: App, 
    public notisData: UserData,
    private alertCtrl: AlertController,
    public modalCtrl : ModalController ){
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter HomePage');
    this.notisData.getNotifications().subscribe((notifications: any) => {
      let count = 0;
      for (var i = 0; i < notifications.length; i++) {
        if( !notifications[i].viewed ){
          count++;
        }
      }    
      this.notificationsLeft = count;
    });
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

  NoFuntion(){
    let alert = this.alertCtrl.create({
      title: 'Función no disponible',
      subTitle: 'Esta funcionalidad aún no está disponible',
      buttons: ['Aceptar']
    });
    alert.present();
  }
  
  openContactFriends(){

    t

    var modalPage = this.modalCtrl.create('ModalPage'); modalPage.present(); 
    
  }
}

