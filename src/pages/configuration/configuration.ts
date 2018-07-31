import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { Welcome } from '../welcome/welcome';

/**
 * Generated class for the ConfigurationPage page.

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
  editabledForm: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App, public userData: UserData, public toastCtrl: ToastController, public appCtrl: App) {  	
    this.user = userData.getUser();
    this.editabledForm = false;
    this.backupUserInfo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigurationPage');
  }

  updateUser(){
    this.userData.updateUser().subscribe((result: any) => {
        if(result.type != 'success') {
          this.recoverUserInfo();
        } else {
          this.setEditable(false);
        }
        this.presentToast(result.message);
    });
  }

  logout(){
    this.userData.logout();
    this.appCtrl.getRootNav().setRoot(Welcome);
    this.presentToast('Sesión finalizada');
  }

  presentToast(msg){
    let toast = this.toastCtrl.create({
        message:  msg,
        position: 'top',
        duration: 3000
    });
    toast.present();
  }

  setEditable(enabled){
    this.editabledForm = enabled;
    if(enabled){
      this.backupUserInfo();
    } else{
      this.recoverUserInfo();
    }
  }

  backupUserInfo(){
      this.user.nombres_old       = this.user.nombres;
      this.user.paterno_old       = this.user.paterno;
      this.user.materno_old       = this.user.materno;
      this.user.email_old         = this.user.email;
      this.user.telefono_old      = this.user.telefono;
      this.user.recibir_mail_old  = this.user.recibir_mail;
      this.user.password_old      = this.user.password;
  }

  recoverUserInfo(){
      this.user.nombres       = this.user.nombres_old;
      this.user.paterno       = this.user.paterno_old;
      this.user.materno       = this.user.materno_old;
      this.user.email         = this.user.email_old;
      this.user.telefono      = this.user.telefono_old;
      this.user.recibir_mail  = this.user.recibir_mail_old;
      this.user.password      = this.user.password_old;
  }

}
