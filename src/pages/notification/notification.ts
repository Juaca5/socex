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
  filter: any = {
    name: '', 
    location: '', 
    hasResult: true };
    enabled: boolean;
    
    enables = true;

  notifications: Array<{
    user: string, 
    message: string, 
    time: string, 
    viewed: boolean, 
    isChecked: boolean, 
    enabled}> = [];

  deleteAll: boolean = false;
  enabledSelectAll = true;
  notificationsEnabled = true;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public confData: NotificationsData){

    }


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
    this.toogleAllNotification();
  }

  toogleAllNotification(){
    if(this.enabledSelectAll === true){
      console.log('toogleAllNotification: '+this.enabledSelectAll);
      for (let i = this.notifications.length - 1; i >= 0; i--) {
          this.notifications[i].enabled = false;
          this.notifications[i].isChecked = this.deleteAll;
      }
    }
    this.enabledSelectAll = true;
  }


  UnselectAll(){
    this.deleteAll = false;
    console.log('UnselectAll: '+this.deleteAll);
  }


  checkNotification(notification){
      let selectedNotifications = 0;
      for (let i = this.notifications.length - 1; i >= 0; i--) {
        if(this.notifications[i].isChecked){
          selectedNotifications++;
        }
      }

      if(selectedNotifications == this.notifications.length){
        this.enabledSelectAll = true;
        this.deleteAll  = true;
      }else if(this.deleteAll){
        this.enabledSelectAll = false;
        this.deleteAll  = false;
      }
  }


  toogleNotification(notification){
    //if(notification.enabled){
    if(this.notificationsEnabled && notification.enabled){
      let selectedNotifications = 0;
      for (let i = this.notifications.length - 1; i >= 0; i--) {
        if(this.notifications[i].isChecked){
          selectedNotifications++;
        }
      }
      this.enabledSelectAll = selectedNotifications == this.notifications.length;
      this.deleteAll  = this.enabledSelectAll;
      console.log('one notification: '+this.notificationsEnabled);
    };
    notification.enabled == true;
  }


  dimissNotifications(){
    	for (let i = this.notifications.length - 1; i >= 0; i--) {
    		if(this.notifications[i].isChecked){
          this.confData.deleteNotification(this.notifications[i]);
    		}
    	}
      this.UnselectAll();
  }


  ReadNotifications(){
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
