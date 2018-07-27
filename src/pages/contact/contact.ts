import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { PlacePage } from '../place/place';
import { ListplacePage } from '../listplace/listplace';

import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  invitationsAccepted: any;
  invitationsRejected: any;
  invitationsSended  : any;
  invitationsTable   : any; 
  newInvitation: any = {};
  selectedLocal: any = {};
  
  constructor(public invitationsData: UserData, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.newInvitation = {};
    this.invitationsTable = '0';
  }

  resetNewInvitation(){
    this.newInvitation = {
      rut_amigo       : '',
      nombre_amigo    : '',
      apellidos_amigo : '',
      pesos           : 1000, 
      estado          : 'enviada',
      rut_user        : this.invitationsData.getUser().rut,
      idEmpresa       : this.selectedLocal.idEmpresa,
      idLocal         : this.selectedLocal.id
    }
  }
  ionViewDidLoad() {
    this.selectedLocal = this.navParams.get('local');
    this.resetNewInvitation();
    this.invitationsData.getInvitations().subscribe((invitations: any) => {
      this.invitationsSended   = [];
      this.invitationsAccepted = [];
      this.invitationsRejected = [];

      for (var i = 0; i < invitations.length; i++) {
        if (invitations[i].estado == 'enviada') {
          this.invitationsSended.push(invitations[i]);
        }
        else if (invitations[i].estado == 'aceptada') {
          this.invitationsAccepted.push(invitations[i]);
        }
        else if (invitations[i].estado == 'rechazada') {
          this.invitationsRejected.push(invitations[i]);
        }
      }
    });
  }

  backToPlace(){
    this.navCtrl.setRoot(PlacePage);    
  }

  showAlert(title, message) {
    const alert = this.alertCtrl.create({
      title   : title,
      subTitle: message,
      buttons : ['Aceptar']
    });
    alert.present();
  }

  LocalDetails() {
    this.navCtrl.setRoot(ListplacePage, {
      local: this.selectedLocal
    });
  }

  sendInvitation() {
    this.validateNewInvitation();
    this.invitationsData.sendInvitation(this.newInvitation).subscribe((response: any) => {
      console.log('send invitation: '+JSON.stringify(response));
      if(response.invitation){
        this.newInvitation = {};
        this.invitationsSended.push(response.invitation);
        this.showAlert('Invitación enviada!', 'Una vez que tu amigo responda, recibiras una notificación con su repuesta!');
      }else{
        this.showAlert('Error!', response.message);        
      }
      this.resetNewInvitation();
    })
  }


  getDaysAgo(date){
    var from = new Date(date);
    var now  = new Date();
    let diff = new Date(now.getTime() - from.getTime());
    return diff.getDate();
  }

  validateNewInvitation(){
      if(!this.newInvitation.rut_amigo || !this.newInvitation.nombre_amigo || !this.newInvitation.apellidos_amigo){
        this.showAlert('Error!', 'Ingrese la información del amigo invitado por favor.');        
      }
  }

}
