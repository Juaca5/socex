import { Component, Pipe, PipeTransform } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Pipe({  
    name: 'filterNotifications',  
    pure: false  
})  
export class FilterNotificationsPipe implements PipeTransform {  
    transform(items: any[], filter: any): any {  
      var user = filter.name.toLowerCase();
        if (!items || !filter) {  
            return [];  
        }  
        return items.filter(item => (
          item.user.toLowerCase().indexOf(user) >= 0 ||
          item.message.toLowerCase().indexOf(user) >= 0
        ));  
    }  
}  

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
  queryText: String = '';
  filter: any = {name: '', location: '', hasResult: true};
  notifications: Array<{user: string, message: string, time: string, viewed: boolean, isChecked: boolean}> = [];
  deleteAll: boolean = false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  	this.notifications = [{
  		user: 'Alexis Reyes',
  		message: 'Aceptó tu solicitud en Fellini', 
  		time: 'hace 45 minutos', 
      viewed: false,
  		isChecked: false
  	    },{
  		user: 'Alejandro Medina',
  		message: 'Aceptó tu solicitud en Café Café', 
  		time: 'hace 3 horas', 
      viewed: false,
  		isChecked: false
  	    },{
  		user: 'Juan Carlos Tapia',
  		message: 'Usaste 40 puntos en Fellini', 
  		time: 'hace 1 día', 
      viewed: false,
  		isChecked: false
  	    },{
  		user: 'Sebastián Piñera',
  		message: 'Usó 25.000 puntos en Starbuks', 
  		time: 'hace 7 horas', 
      viewed: false,
  		isChecked: false
  	    },{
  		user: 'Pedro Hernández',
  		message: 'Aceptó tu solicitud en Marco Polo', 
  		time: 'hace 1 día', 
      viewed: false,
  		isChecked: false
  	    },{
  		user: 'Esteban Paredes',
  		message: 'Usó 250 puntos en Fellini', 
  		time: 'hace 1 día', 
      viewed: false,
  		isChecked: false
  	}];
  }

  selectAll(){
      for (var i = this.notifications.length - 1; i >= 0; i--) {
        this.notifications[i].isChecked = this.deleteAll;
      }
  }

  dimissNotifications(){
    	for (var i = this.notifications.length - 1; i >= 0; i--) {
    		if(this.notifications[i].isChecked){
    			this.notifications.splice(i, 1);
    		}
    	}
  }

  checkNotifications(){
      for (var i = this.notifications.length - 1; i >= 0; i--) {
        if(this.notifications[i].isChecked){
          this.notifications[i].viewed = true;
        }
      }
  }

  updateNotifications(){
    this.filter.name =this.queryText;
  }


}
