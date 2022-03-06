import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiskCalculationPage } from './risk-calculation.page';

const routes: Routes = [
  {
    path: '',
    component: RiskCalculationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiskCalculationPageRoutingModule {}
