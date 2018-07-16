import { Component, Pipe, PipeTransform } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

@Pipe({  
    name: 'filterNotifications',  
    pure: false  
})
export class FilterNotificationsPipe implements PipeTransform {  
    transform(items: any[], filter: any): any {  
        if (!items || !filter) {  
            return [];  
        }  
        var recept = filter.word.toLowerCase();
        return items.filter(item => (
          item.recept.toLowerCase().indexOf(recept) >= 0 ||
          item.contenido.toLowerCase().indexOf(recept) >= 0
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
  filter: any = {word: '', location: '', hasResult: true};
  notifications: Array<any> = [];
  deleteAll: boolean = false;
  enabledSelectAll = true;
  notificationsEnabled = true;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public confData: UserData) {  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
    this.confData.getNotifications().subscribe((data: any) => {
      this.notifications = data;
      //console.log('notificarions list: '+this.notifications);
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
      //console.log('one notification: '+this.notificationsEnabled);
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
          this.notifications[i].estado = true;
        }
      }
      this.UnselectAll();
  }


  updateNotifications(){
    this.filter.word =this.queryText;
    this.UnselectAll();
  }


}
