import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RiskMapPageRoutingModule } from './risk-map-routing.module';

import { RiskMapPage } from './risk-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RiskMapPageRoutingModule
  ],
  declarations: [RiskMapPage]
})
export class RiskMapPageModule {}
