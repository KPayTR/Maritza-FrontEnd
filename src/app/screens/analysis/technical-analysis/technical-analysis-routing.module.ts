import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechnicalAnalysisPage } from './technical-analysis.page';

const routes: Routes = [
  {
    path: '',
    component: TechnicalAnalysisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechnicalAnalysisPageRoutingModule {}
