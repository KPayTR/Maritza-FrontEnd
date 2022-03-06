import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EconomicCalendarPage } from './economic-calendar.page';

const routes: Routes = [
  {
    path: '',
    component: EconomicCalendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EconomicCalendarPageRoutingModule {}
