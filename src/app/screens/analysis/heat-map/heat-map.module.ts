import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeatMapPageRoutingModule } from './heat-map-routing.module';

import { HeatMapPage } from './heat-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeatMapPageRoutingModule
  ],
  declarations: [HeatMapPage]
})
export class HeatMapPageModule {}
