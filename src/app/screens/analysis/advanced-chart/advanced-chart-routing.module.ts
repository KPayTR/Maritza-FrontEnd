import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvancedChartPage } from './advanced-chart.page';

const routes: Routes = [
  {
    path: '',
    component: AdvancedChartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvancedChartPageRoutingModule {}
