import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactfriendsPage } from './contactfriends';

@NgModule({
  declarations: [
    ContactfriendsPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactfriendsPage),
  ],
})
export class ContactfriendsPageModule {}
