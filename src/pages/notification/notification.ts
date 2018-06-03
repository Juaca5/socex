import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  notifications: Array<{user: string,message: string, time: string, isChecked: boolean}> = [];
  deleteAll: Boolean = false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  	this.notifications = [{
  		user: 'Alexis Reyes',
  		message: 'Aceptó tu solicitud en Fellini', 
  		time: 'hace 45 minutos', 
  		isChecked: false
  	    },{
  		user: 'Alejandro Medina',
  		message: 'Aceptó tu solicitud en Café Café', 
  		time: 'hace 3 horas', 
  		isChecked: false
  	    },{
  		user: 'Juan Carlos Tapia',
  		message: 'Usaste 40 puntos en Fellini', 
  		time: 'hace 1 día', 
  		isChecked: false
  	    },{
  		user: 'Sebastián Piñera',
  		message: 'Usó 25.000 puntos en Starbuks', 
  		time: 'hace 7 horas', 
  		isChecked: false
  	    },{
  		user: 'Pedro Hernández',
  		message: 'Aceptó tu solicitud en Marco Polo', 
  		time: 'hace 1 día', 
  		isChecked: false
  	    },{
  		user: 'Esteban Paredes',
  		message: 'Usó 250 puntos en Fellini', 
  		time: 'hace 1 día', 
  		isChecked: false
  	}];
  }

  dimissNotifications(){
  	if (this.deleteAll) {
  		this.notifications = [];
	}else{
	  	for (var i = this.notifications.length - 1; i >= 0; i--) {
	  		if(this.notifications[i].isChecked){
	  			this.notifications.splice(i, 1);
	  		}
	  	}
	}
  }

}
