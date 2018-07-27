import { Component, ViewChild, Pipe, PipeTransform, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ContactPage } from '../contact/contact';

import { ListplacePage } from '../listplace/listplace';
import { PointsPage } from '../points/points';
import { InfoPage } from '../info/info';

import { UserData } from '../../providers/user-data';



declare var google: any;

@Pipe({  
    name: 'filterLocales',  
    pure: false  
})  
export class FilterLocalesrPipe implements PipeTransform {  
    transform(items: any[], filter: any): any {  
        var array = [];
        var name = filter.name.toLowerCase();
        if (items && filter) {  
          for (var i = 0; i < items.length; i++) {
            if(!name || items[i].nombre.toLowerCase().indexOf(name)){
              for (var j = 0; j < items[i].sucursales.length; j++) {
                array.push(items[i].sucursales[j]);
              }
            }
          }
        }
        return array;
    }  
}  

/**
 * Generated class for the PlacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})

export class PlacePage {
  map: any;
  queryText: String = '';
  filter: any = {name: '', location: '', hasResult: true};
  allLocales: Array<any> = [];
  invitations: Array<any> = [];
  selectedLocal: any = undefined;
  days: any = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  OnMap = '0';


  @ViewChild('mapCanvas') mapElement: ElementRef;
	constructor(public localsData: UserData, public invData: UserData, public platform: Platform, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

        this.localsData.getLocales().subscribe((mapData: any) => {
          this.allLocales = mapData;
          let mapEle = this.mapElement.nativeElement;
          this.map = new google.maps.Map(mapEle, {
            center: this.allLocales[0].sucursales[0],
            zoom: 16
          });
        
          this.allLocales.forEach((localData: any) => {
            localData.sucursales.forEach((sucursal: any) => {
                let infoWindow = new google.maps.InfoWindow({
                  content: `<h5>${localData.nombre}</h5><p>${sucursal.direccion}</p>`
                });
                let marker = new google.maps.Marker({
                  position: sucursal,
                  map: this.map,
                  title: localData.nombre
                });
                marker.addListener('click', () => {
                  infoWindow.open(this.map, marker);
                });
            });
          });

          google.maps.event.addListenerOnce(this.map, 'idle', () => {
            mapEle.classList.add('show-map');
          });
        });
        this.updateLocales();

        this.invData.getInvitations().subscribe((data: any) => {
          this.invitations = data;
          console.log('invitations: '+this.invitations);
        });

  }

  updateLocales(){
  	this.filter.name =this.queryText;
  }
  
  LocalDetails(local){
      this.navCtrl.setRoot(ListplacePage, {
        local: local
      });
  }

  Invite(local){
      this.navCtrl.setRoot(ContactPage, {
        local: local
      });
  }
  Points(local){
    this.navCtrl.setRoot(PointsPage, {
      local: local
    });
  }

  LocateInMap(sucursal){
    if(this.OnMap == '0'){
      this.map.panTo(sucursal);
    }
  }
  
  InfoLocal(local){
    this.navCtrl.setRoot(InfoPage, {
      local: local
    });
  }


}
