import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeatMapPage } from './heat-map.page';

const routes: Routes = [
  {
    path: '',
    component: HeatMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeatMapPageRoutingModule {}
