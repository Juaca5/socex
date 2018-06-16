import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { UserData } from './user-data';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class NotificationsData {
  data: any;

  constructor(public http: Http, public user: UserData) { }

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get('assets/data/data.json')
        .map(this.processData, this);
    }
  }

  processData(data: any) {
    this.data = data.json();
    return this.data;
  }

  getNotifications() {
    return this.load().map((data: any) => {
      return data.notifications;
    });
  }

  refreshNotifications() {
    this.data = undefined;
    return this.getNotifications();
  }



  addNotification(inv: any): void {
    // insert invitación en el servidor
    this.data.notifications.push(inv);
  };

  deleteNotification(inv: any): void {
    inv.checked = true;
    inv.viewed = true;
    this.updateNotification(inv);
    let index = this.data.notifications.indexOf(inv);
    if (index > -1) {
      this.data.notifications.splice(index, 1);
    }
  };

  updateNotification(inv: any): void {
    // modificar invitación en servidor
    console.log('modificar Notificacion en servidor')
  }


}
