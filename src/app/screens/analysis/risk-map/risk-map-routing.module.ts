import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiskMapPage } from './risk-map.page';

const routes: Routes = [
  {
    path: '',
    component: RiskMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiskMapPageRoutingModule {}
