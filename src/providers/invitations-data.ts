import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { UserData } from './user-data';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class InvitationsData {
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


}
