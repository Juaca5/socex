import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeoplacePage } from './geoplace';

@NgModule({
  declarations: [
    GeoplacePage,
  ],
  imports: [
    IonicPageModule.forChild(GeoplacePage),
  ],
})
export class GeoplacePageModule {}
