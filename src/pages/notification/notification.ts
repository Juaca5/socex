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
  deleteAllChange: boolean = false;
  notDeleteAllChange: boolean = false;
  selectedNotifications: Number;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public confData: NotificationsData) {  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
    this.confData.getNotifications().subscribe((data: any) => {
      this.notifications = data;
      console.log('notificarions list: '+this.notifications);
    });
  }

  refreshNotifications(){
    this.confData.refreshNotifications().subscribe((data: any) => {
      this.UnselectAll();
      this.notifications = data;
    });
  }

  selectAll(){
    if(!this.deleteAllChange){
      this.notDeleteAllChange = true;
      this.selectedNotifications = this.deleteAll? 0: this.notifications.length;
      for (let i = this.notifications.length - 1; i >= 0; i--) {
        this.notifications[i].isChecked = this.deleteAll;
      }
    }
    this.deleteAllChange = false;
  }

  UnselectAll(){
    this.deleteAll = false;
    this.selectedNotifications = 0;
    console.log('deleteAll: '+this.deleteAll);
  }

  toogleNotification(notification){
    if(!this.notDeleteAllChange){
      this.deleteAllChange = true;
      if (notification.isChecked) {
        this.selectedNotifications++;
      } else {
        this.selectedNotifications--;
      }
      this.deleteAll = this.selectedNotifications == this.notifications.length;
      console.log('deleteAll: '+this.selectedNotifications +"=="+ this.notifications.length);
    }
  }

  dimissNotifications(){
    	for (let i = this.notifications.length - 1; i >= 0; i--) {
    		if(this.notifications[i].isChecked){
          this.confData.deleteNotification(this.notifications[i]);
    		}
    	}
      this.UnselectAll();
  }

  checkNotifications(){
      for (let i = this.notifications.length - 1; i >= 0; i--) {
        if(this.notifications[i].isChecked){
          this.notifications[i].viewed = true;
        }
      }
      this.UnselectAll();
  }

  updateNotifications(){
    this.filter.name =this.queryText;
    this.UnselectAll();
  }


}
