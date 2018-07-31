import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  username: string;
  password: string;
  error:    string;

  connection: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public userData: UserData,
    private network: Network ){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  login(){
    this.error = undefined;
    if(!this.username || !this.password){
      this.error = 'Ingrese su nombre de usuario y contraseña.';
      return; 
    }

    if(this.network.onConnect){
      this.userData.login(this.username, this.password).subscribe((sucess: any) => {
        if(sucess == true){
          this.navCtrl.push(TabsPage);
        }else{
          this.error = 'Nombre de usuario o contraseña incorrecta.';
        }
      });

    } else {
        this.error = 'Error de conexión. Revise su conexión a Internet e intente nuevamente.';
    }
  }

}