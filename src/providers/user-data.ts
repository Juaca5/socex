import { Injectable } from '@angular/core';

import { Http } from '@angular/http'; //, Headers, RequestOptions
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserData {

  URL_base: string  = 'http://socex-backend.esy.es'; //'http://localhost/socex_backend/index.php';//'http://31.220.104.182';
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

//  getRequestOptions() {
//    var headers = new Headers();
    /*headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');*/
//    headers.append('content-type','application/json');
//    let options = new RequestOptions({ headers:headers});// , withCredentials: true});

//    return options;
//  } 
//

  
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
    this.data = null;
//    try{
      this.data = data.json();
      console.log(this.data);
      
      if(!this.data.notifications){
        console.log('No notifications from server!');
        this.data.notifications = [];
      }
      console.log('notifications');
      this.data.notifications.forEach((n: any) => {
        n.leida = n.leida == "1"; 
      });
      console.log('notifications');
      if(!this.data.invitations){
        console.log('No invitations from server!');
        this.data.invitations = [];
      }
      console.log('invitations');

      this.data.locales.forEach((localData: any) => {
      console.log('locales');
        localData.sucursales.forEach((sucursal: any) => {
      console.log('locales');
            sucursal.idEmpresa              = localData.id;
            sucursal.empresa                = localData.nombre;
            sucursal.encargado              = localData.encargado;
            sucursal.fono                   = localData.fono;
            sucursal.logo                   = localData.logo;
            sucursal.puntos                 = localData.puntos;
            sucursal.restricciones          = localData.restricciones;
            sucursal.tope_max_desc          = localData.tope_max_desc;
            sucursal.tope_max_primera_venta = localData.tope_max_primera_venta;
            sucursal.web                    = localData.web;
            sucursal.lng                    = parseFloat(sucursal.lng);
            sucursal.lat                    = parseFloat(sucursal.lat);
            //sucursal.cartola                = localData.cartola;
            sucursal.acumula_user           = localData.acumula_user;
            sucursal.acumula_amigo          = localData.acumula_amigo;
            sucursal.vigencia_pesos         = localData.vigencia_pesos;

            sucursal.pesos                  = (sucursal.cartola && sucursal.cartola.length)? sucursal.cartola[0].saldo: 0;
            console.log(sucursal.pesos);
        });
      });
      console.log('locales');

      console.log(this.data);
      return this.data;
//    }catch(e){
//      return e.message;
//    }
  }
  processLogin(user: any) { // el servidor retorna un objeto json user: {...} o un objeto null.
    this.user = null; 
    try{
      let userdata = user.json();
      this.user = userdata.user;
      if(this.user){
        this.user.recibir_mail = this.user.recibir_mail == "1"; 
        this.user.avatar = this.user.avatar? this.user.avatar : 'assets/imgs/user.png';
        
        this.storage.set(this.HAS_LOGGED_IN, true);
        this.storage.set('user', this.user);
        this.events.publish('user:login');
        console.log('login sucess: '+ JSON.stringify(this.user));
      }
    }catch(e){
      return false;
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
  sendInvitation(inv: any) {
    return this.http.post(this.URL_Invi, {invitation: inv, idUser: this.user.id, token: this.user.token}).map(this.processInvitationResponse, this);
  };
  removeInvitation(inv: any) {
    inv.checked = true;
    let index = this.data.invitations.indexOf(inv);
    if (index > -1) {
      this.data.invitations.splice(index, 1);
    }
  };
  cancelInvitation(inv: any) {
    return this.http.put(this.URL_Invi, {invitation: inv, idUser: this.user.id, token: this.user.token}).map(this.processCancelInvitation, this);
  }
  processInvitationResponse(data){
    let response = data.json();
    if (response.invitation) {
       this.data.invitations.push(response.invitation);
       return {type: 'success', invitation: response.invitation};
    } else {
       return {type: 'error',   message: response.error};
    }
  }
  processCancelInvitation(data){
    let response = data.json();
    if(response.invitation) {
      // rechazar localmente
      for (var i = 0; i < this.data.invitations.length; i++) {
        if(this.data.invitations[i].id = response.invitation.id){
           this.data.invitations[i] = response.invitation;
           break;
        }      
      }
      return {type: 'success', invitation: response.invitation};
    } else {
       return {type: 'error',   message: response.error};
    }
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

  deleteNotification(inv: any) {
    return this.http.delete(this.URL_Noti+'/'+inv.id+'/'+this.user.id+'/'+this.user.token).map(this.processNotificationResponse, this);
  };

  LeerNotification(inv: any) {
    inv.leida = true;
    return this.http.put(this.URL_Noti, {notification: inv, idUser: this.user.id, token: this.user.token}).map(this.processNotificationResponse, this);
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
    return this.http.get(this.URL_login+'/'+username+'/'+password)
        .map(this.processLogin, this);
  };
  
  updateUser() {
    return this.http.put(this.URL_login, {user: this.user}).map(this.processUpdateUserResponse, this);
  };

  processUpdateUserResponse(data){
    let response = data.json();
    if (response.user) {
       this.user = response.user;
       return {type: 'success', message: 'Información Actualizada!'};
    } else {
       return {type: 'error',   message: response.error};
    }
  }

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
