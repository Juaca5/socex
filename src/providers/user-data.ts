import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserData {

  
  URL_login: string = 'http://192.168.43.170/socex_backend/API_Login/';
  URL_data:  string = 'http://192.168.43.170/socex_backend/API_Data/';
  
  /*
  URL_login: string = 'assets/data/data.json';
  URL_data:  string = 'assets/data/data.json';
  */
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  data: any;
  user: any;

  constructor(public http: Http, public events: Events, public storage: Storage) {}
  
  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get(this.URL_data+'/'+this.user.id+'/'+this.user.token)
        .map(this.processData, this);
    }
  }
  /*

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get(this.URL_data)
        .map(this.processData, this);
    }
  }
*/
  processData(data: any) {
    this.data = data.json();
    return this.data;
  }
  processLogin(user: any) { // el servidor retorna un objeto json user: {...} o un objeto null.
    let userdata = user.json();
    this.user = userdata.user;
    if(this.user){
      this.storage.set(this.HAS_LOGGED_IN, true);
      this.storage.set('user', this.user);
      this.events.publish('user:login');
      console.log('login sucess: '+ JSON.stringify(this.user));
    }
    return this.user != null;
  }



  // ==================== invitations ====================
  getInvitations() {
    return this.load().map((data: any) => {
      return data.invitations;
    });
  }
  refreshInvitations() {
    this.data = undefined;
    return this.getInvitations();
  }
  addInvitation(inv: any): void {
    // insert invitación en el servidor
    this.data.invitations.push(inv);
  };
  removeInvitation(inv: any): void {
    inv.checked = true;
    this.updateInvitation(inv);
    let index = this.data.invitations.indexOf(inv);
    if (index > -1) {
      this.data.invitations.splice(index, 1);
    }
  };
  updateInvitation(inv: any): void {
    // modificar invitación en servidor
  }

  // ==================== notifications ====================
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

  // ==================== Locales ====================
  getLocales() {
    return this.load().map((data: any) => {
      return data.locales.sort((a: any, b: any) => { // ordenar por nombre, se puede cambiar
        let aName = a.informacion.nombre; //.split(' ').pop();
        let bName = b.informacion.nombre; //.split(' ').pop();
        return aName.localeCompare(bName);
      });
    });
  }
  refreshLocales() {
    this.data = undefined;
    return this.getLocales();
  }

  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  };
  
  login(username: string, password: string) {
    console.log('login: '+username+', '+password);
    return this.http.get(this.URL_login+'/'+username+'/'+password)
        .map(this.processLogin, this);
  };
  
  /*
  login(username: string, password: string) {
    console.log('login: '+username+', '+password);
    return this.http.get(this.URL_login)
        .map(this.processLogin, this);
  };
  */

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('user');
    this.events.publish('user:logout');
  };

  setuser(user: any): void {
    this.storage.set('user', user);
  };

  getUser(): any {
    console.log('get user: '+this.user);
    return this.user;
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };
}
