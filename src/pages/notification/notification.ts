import { Component, Pipe, PipeTransform } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

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
  toastVisible = false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public confData: UserData, public toastCtrl: ToastController) {  }


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
          this.confData.deleteNotification(this.notifications[i]).subscribe((result: any) => {
              this.presentToast(result.message)
              if(result.type == 'success'){
                  this.notifications.splice(i, 1);
              }
          });
        }
      }
      this.UnselectAll();
  }


  ReadNotifications(){
      for (let i = this.notifications.length - 1; i >= 0; i--) {
        if(this.notifications[i].isChecked){
          this.notifications[i].leida = true;
          this.confData.LeerNotification(this.notifications[i]).subscribe((result: any) => {
              if(result.type == 'error'){
                this.notifications[i].leida = false;
              }else{
                this.notifications[i].isChecked = false;
                this.notifications[i].leida = true;
              }
              this.presentToast(result.message)
          });
        }
      }
      this.UnselectAll();
  }


  updateNotifications(){
    this.filter.word =this.queryText;
    this.UnselectAll();
  }


  getTimeAgo(time) {
    let date = new Date(time);
    let now  = new Date();
    let diff = new Date(now.getTime() - date.getTime());

    let ago = '';
    if(diff.getFullYear() > 1970){
       ago = diff.getFullYear() + ' años';
    } else if(diff.getMonth() > 1){
       ago = diff.getMonth() + ' meses';
    } else if(diff.getMonth() == 1){
       ago = diff.getMonth() + ' mes';
    }else if(diff.getDate() > 1 ){
       ago = diff.getDate() + ' dias';    
    } else if(diff.getHours() > 1){
       ago = diff.getHours() + ' horas';    
    } else if(diff.getHours() == 1){
       ago = diff.getHours() + ' hora';    
    } else if(diff.getMinutes() > 1){
       ago = diff.getMinutes() + ' minutos';    
    } else if(diff.getMinutes() == 1){
       ago = diff.getMinutes() + ' minuto';    
    }else if(diff.getSeconds() > 1){
       ago = diff.getSeconds() + ' segundos';    
    }
    return ago;
  }

  presentToast(message) {
    if(!this.toastVisible){
      this.toastVisible = true;
      const toast = this.toastCtrl.create({
        message:  message,
        position: 'top',
        duration: 3000
      });
      toast.onDidDismiss(() => {
        this.toastVisible = false;
      });
      toast.present();
    }
  }

}
