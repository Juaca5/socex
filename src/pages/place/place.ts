import { Component, ViewChild, Pipe, PipeTransform, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ContactPage } from '../contact/contact';

//import { Local, Invitation } from '../../interfaces/models';
import { PointsPage } from '../points/points';
import { InfolocalPage } from '../infolocal/infolocal';

import { LocalesData } from '../../providers/locales-data';
import { InvitationsData } from '../../providers/invitations-data';



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
  invitations: Array<any> = [];
  selectedLocal: any = undefined;
  days: any = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  OnMap = '0';


  @ViewChild('mapCanvas') mapElement: ElementRef;
	constructor(public localsData: LocalesData, public invData: InvitationsData, public platform: Platform, public navCtrl: NavController, public navParams: NavParams) {
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
          console.log('locales list: '+this.allLocales);

          let mapEle = this.mapElement.nativeElement;
          let map = new google.maps.Map(mapEle, {
            center: mapData.find((d: any) => d.center),
            zoom: 16
          });
        
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
    this.navCtrl.push(InfolocalPage, {
      local: local
    });
  }


}
