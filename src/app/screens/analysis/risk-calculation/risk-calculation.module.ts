import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RiskCalculationPageRoutingModule } from './risk-calculation-routing.module';

import { RiskCalculationPage } from './risk-calculation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RiskCalculationPageRoutingModule
  ],
  declarations: [RiskCalculationPage]
})
export class RiskCalculationPageModule {}
