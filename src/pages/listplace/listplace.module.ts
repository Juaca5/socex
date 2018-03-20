import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListplacePage } from './listplace';

@NgModule({
  declarations: [
    ListplacePage,
  ],
  imports: [
    IonicPageModule.forChild(ListplacePage),
  ],
})
export class ListplacePageModule {}
