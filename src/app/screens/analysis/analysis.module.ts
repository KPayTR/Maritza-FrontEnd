import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalysisPage } from './analysis.page';

import { AnalysisPageRoutingModule } from './analysis-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AnalysisPageRoutingModule
  ],
  declarations: [AnalysisPage]
})
export class AnalysisPageModule {}
