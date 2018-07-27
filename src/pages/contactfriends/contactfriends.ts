import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ContactfriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contactfriends',
  templateUrl: 'contactfriends.html',
})
export class ContactfriendsPage {

  constructor(
    public navParams: NavParams,
    public navCtrl : NavController,
    private viewCtrl : ViewController) {
  }
  ionViewDidLoad() {
    let data = this.navParams.get('data');
    console.log(data);
  }


  closeModal(){
    console.log("close modal click");
    this.viewCtrl.dismiss();
  }
}
