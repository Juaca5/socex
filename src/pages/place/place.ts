import { Component, ViewChild, Pipe, PipeTransform, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ContactPage } from '../contact/contact';

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
      var name = filter.name.toLowerCase();
        if (!items || !filter) {  
            return [];  
        }  
        return items.filter(item => (
          item.nombre.toLowerCase().indexOf(name) >= 0
        ));  
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
    console.log('ionViewDidLoad PlacePage');
    this.selectedLocal = this.navParams.get('local');


      if (this.selectedLocal){
        this.selectedLocal = this.navParams.get('local');
        console.log('local details '+this.selectedLocal);

      }else{
        this.localsData.getLocales().subscribe((mapData: any) => {
          this.allLocales = mapData;

          this.allLocales[0].sucursales[0].lng = parseFloat(this.allLocales[0].sucursales[0].lng);
          this.allLocales[0].sucursales[0].lat = parseFloat(this.allLocales[0].sucursales[0].lat);
          console.log('locales list: '+JSON.stringify(this.allLocales[0].sucursales[0]));

          let mapEle = this.mapElement.nativeElement;
          let map = new google.maps.Map(mapEle, {
            center: this.allLocales[0].sucursales[0],
            zoom: 16
          });
        
          this.allLocales.forEach((localData: any) => {
            console.log(JSON.stringify(localData.restricciones));
            localData.sucursales.forEach((sucursal: any) => {
                sucursal.lng = sucursal.lng instanceof Number? sucursal.lng: parseFloat(sucursal.lng);
                sucursal.lat = sucursal.lat instanceof Number? sucursal.lat: parseFloat(sucursal.lat);
                let infoWindow = new google.maps.InfoWindow({
                  content: `<h5>${localData.nombre}</h5><p>${sucursal.direccion}</p>`
                });
                let marker = new google.maps.Marker({
                  position: sucursal,
                  map: map,
                  title: localData.nombre
                });
                marker.addListener('click', () => {
                  infoWindow.open(map, marker);
                });
            });
          });

          google.maps.event.addListenerOnce(map, 'idle', () => {
            mapEle.classList.add('show-map');
          });
        });
        this.updateLocales();

        this.invData.getInvitations().subscribe((data: any) => {
          this.invitations = data;
          console.log('invitations: '+this.invitations);
        });
      }

  }

  updateLocales(){
  	this.filter.name =this.queryText;
  }
  
  LocalDetails(local){
      this.navCtrl.setRoot(PlacePage, {
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

  LocateInMap(local){
    if(this.OnMap == '0'){
      console.log('locateInMap!');
    }
  }
  
  InfoLocal(local){
    this.navCtrl.setRoot(InfoPage, {
      local: local
    });
  }


}
