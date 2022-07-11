import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvancedChartPageRoutingModule } from './advanced-chart-routing.module';

import { AdvancedChartPage } from './advanced-chart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvancedChartPageRoutingModule
  ],
  declarations: [AdvancedChartPage]
})
export class AdvancedChartPageModule {}
