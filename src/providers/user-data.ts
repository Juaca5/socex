import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserData {

  URL_base: string  = 'http://pace.uv.cl/socex_backend/index.php';//'http://localhost';//'http://31.220.104.182';
  URL_login: string = this.URL_base+'/API_Login';
  URL_data:  string = this.URL_base+'/API_Data';
  URL_Noti:  string = this.URL_base+'/API_Notifications';
  URL_Invi:  string = this.URL_base+'/API_Invitations';

  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  data: any;
  user: any;

  constructor(public http: Http, public events: Events, public storage: Storage) {}

  getRequestOptions() {
    var headers = new Headers();
    /*headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');*/
    headers.append('content-type','application/json');
    let options = new RequestOptions({ headers:headers});// , withCredentials: true});

    return options;
  }
  
  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get(this.URL_data+'/'+this.user.rut+'/'+this.user.token, this.getRequestOptions())
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

    for (var i = 0; i < this.data.notifications.length; i++) {
      this.data.notifications[i].leida = this.data.notifications[i].leida == "1"; 
      console.log(this.data.notifications[i].leida);
    }

    return this.data;
  }
  processLogin(user: any) { // el servidor retorna un objeto json user: {...} o un objeto null.
    let userdata = user.json();
    this.user = userdata.user;
    if(this.user){
      this.user.recibir_mail = this.user.recibir_mail == "1"; 
      
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

  addNotification(inv: any) {
    // insert invitación en el servidor
    this.http.post(this.URL_Noti, {id: inv.id}, this.getRequestOptions()).subscribe( 
        response => {
            this.data.notifications.push(inv);
        },
        error => {
          console.log('Error add notification: '+JSON.stringify(error));
          return {type: 'danger', message: error.message}
    });
  };

  deleteNotification(inv: any) {
    return this.http.delete(this.URL_Noti+'/'+inv.id, this.getRequestOptions()).map(this.processNotificationResponse, this);
  };

  LeerNotification(inv: any) {
    inv.leida = true;
    return this.http.put(this.URL_Noti, {invitation: inv}, this.getRequestOptions()).map(this.processNotificationResponse, this);
  }
  processNotificationResponse(data: any){
    let response = data.json();
    if (response.success) {
       return {type: 'success', message: response.success};
    } else {
       return {type: 'error',   message: response.error};
    }
  }

  // ==================== Locales ====================
  getLocales() {
    return this.load().map((data: any) => {
      return data.locales.sort((a: any, b: any) => { // ordenar por nombre, se puede cambiar
        let aName = a.nombre; //.split(' ').pop();
        let bName = b.nombre; //.split(' ').pop();
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
    return this.http.get(this.URL_login+'/'+username+'/'+password, this.getRequestOptions())
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
    this.data = null;
    this.user = null;
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
