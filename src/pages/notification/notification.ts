import { Component, Pipe, PipeTransform } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NotificationsData } from '../../providers/notifications-data';

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
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public confData: NotificationsData) {  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
    this.confData.getNotifications().subscribe((data: any) => {
      this.notifications = data;
      console.log('notificarions list: '+this.notifications);
    });
  }

  selectAll(){
      for (let i = this.notifications.length - 1; i >= 0; i--) {
        this.notifications[i].isChecked = this.deleteAll;
      }
  }

  dimissNotifications(){
    	for (let i = this.notifications.length - 1; i >= 0; i--) {
    		if(this.notifications[i].isChecked){
          this.confData.deleteNotification(this.notifications[i]);
    			//this.notifications.splice(i, 1);
    		}
    	}
  }

  checkNotifications(){
      for (let i = this.notifications.length - 1; i >= 0; i--) {
        if(this.notifications[i].isChecked){
          this.notifications[i].viewed = true;
        }
      }
  }

  updateNotifications(){
    this.filter.name =this.queryText;
  }


}
