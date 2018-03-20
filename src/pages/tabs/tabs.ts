import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

import { HomePage } from '../home/home';
import { PlacePage } from '../place/place';
import { NotificationPage } from '../notification/notification';
import { ConfigurationPage } from '../configuration/configuration';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  home = HomePage;
  place = PlacePage;
  noty = NotificationPage;
  config = ConfigurationPage;
  
  about = AboutPage;
  contact = ContactPage;

  constructor() {

  }
}
