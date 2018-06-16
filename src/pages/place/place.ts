import { Component, ViewChild, Pipe, PipeTransform, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { ContactPage } from '../contact/contact';
import { PointsPage } from '../points/points';

import { LocalesData } from '../../providers/locales-data';
import { importType } from '@angular/compiler/src/output/output_ast';

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
          item.name.toLowerCase().indexOf(name) >= 0
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
  selectedLocal: any = undefined;
  days: any = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

  @ViewChild('mapCanvas') mapElement: ElementRef;
	constructor(public confData: LocalesData, public platform: Platform, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacePage');
    this.selectedLocal = this.navParams.get('local');


      console.log(this.selectedLocal);
      if (this.selectedLocal){
        this.selectedLocal = this.navParams.get('local');
        console.log('local details');
      }else{
        console.log('locales list');
        this.allLocales = [{
      name: 'Fellini',
      logo: 'assets/imgs/logo_sin_fondo.png', 
      suma: '10 + 10',
      location: '',
      puntos: 3000
        },{
      name: 'Piccola italia',
      logo: 'assets/imgs/locales/piccola_italia.png', 
      suma: '10 + 15',
      location: '',
      puntos: 4500 
        },{
      name: 'Starbucks',
      logo: 'assets/imgs/locales/starbucks.jpg', 
      suma: '15 + 10',
      location: '',
      puntos: 3000 
        },{
      name: 'Italissimo',
      logo: 'assets/imgs/locales/italissimo.png', 
      suma: '15 + 15',
      location: '',
      puntos: 5000 
        },{
      name: 'Fellini',
      logo: 'assets/imgs/logo_sin_fondo.png', 
      suma: '10 + 10',
      location: '',
      puntos: 3000
        },{
      name: 'Piccola italia',
      logo: 'assets/imgs/locales/piccola_italia.png', 
      suma: '10 + 15',
      location: '',
      puntos: 4500 
        },{
      name: 'Starbucks',
      logo: 'assets/imgs/locales/starbucks.jpg', 
      suma: '15 + 10',
      location: '',
      puntos: 3000 
        },{
      name: 'Italissimo',
      logo: 'assets/imgs/locales/italissimo.png', 
      suma: '15 + 15',
      location: '',
      puntos: 5000 
        },{
      name: 'Fellini',
      logo: 'assets/imgs/logo_sin_fondo.png', 
      suma: '10 + 10',
      location: '',
      puntos: 3000
        },{
      name: 'Piccola italia',
      logo: 'assets/imgs/locales/piccola_italia.png', 
      suma: '10 + 15',
      location: '',
      puntos: 4500 
        },{
      name: 'Starbucks',
      logo: 'assets/imgs/locales/starbucks.jpg', 
      suma: '15 + 10',
      location: '',
      puntos: 3000 
        },{
      name: 'Italissimo',
      logo: 'assets/imgs/locales/italissimo.png', 
      suma: '15 + 15',
      location: '',
      puntos: 5000 
        },{
      name: 'Fellini',
      logo: 'assets/imgs/logo_sin_fondo.png', 
      suma: '10 + 10',
      location: '',
      puntos: 3000
        },{
      name: 'Piccola italia',
      logo: 'assets/imgs/locales/piccola_italia.png', 
      suma: '10 + 15',
      location: '',
      puntos: 4500 
        },{
      name: 'Starbucks',
      logo: 'assets/imgs/locales/starbucks.jpg', 
      suma: '15 + 10',
      location: '',
      puntos: 3000 
        },{
      name: 'Italissimo',
      logo: 'assets/imgs/locales/italissimo.png', 
      suma: '15 + 15',
      location: '',
      puntos: 5000 
        }];
        this.confData.getMap().subscribe((mapData: any) => {
          let mapEle = this.mapElement.nativeElement;

          let map = new google.maps.Map(mapEle, {
            center: mapData.find((d: any) => d.center),
            zoom: 16
          });

          //this.allLocales = mapData;

          mapData.forEach((markerData: any) => {

            let infoWindow = new google.maps.InfoWindow({
              content: `<h5>${markerData.name}</h5>`
            });

            let marker = new google.maps.Marker({
              position: markerData,
              map: map,
              title: markerData.name
            });

            marker.addListener('click', () => {
              infoWindow.open(map, marker);
            });
          });

          google.maps.event.addListenerOnce(map, 'idle', () => {
            mapEle.classList.add('show-map');
          });
        });

        this.updateLocales();
      }

  }

  updateLocales(){
  	this.filter.name =this.queryText;
  }
  
  LocalDetails(local){
    this.navCtrl.push(PlacePage, {
      local: local
    });
  }

  Invite(local){
    this.navCtrl.push(ContactPage,{
      local: local
    });
  }

  Points(local){
    this.navCtrl.push(ContactPage,{
      local: local
    });
  }

}
