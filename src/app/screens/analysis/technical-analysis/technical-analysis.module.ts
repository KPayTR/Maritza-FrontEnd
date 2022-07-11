import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechnicalAnalysisPageRoutingModule } from './technical-analysis-routing.module';

import { TechnicalAnalysisPage } from './technical-analysis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TechnicalAnalysisPageRoutingModule
  ],
  declarations: [TechnicalAnalysisPage]
})
export class TechnicalAnalysisPageModule {}
