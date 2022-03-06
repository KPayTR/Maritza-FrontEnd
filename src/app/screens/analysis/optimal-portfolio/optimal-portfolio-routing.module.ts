import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OptimalPortfolioPage } from './optimal-portfolio.page';

const routes: Routes = [
  {
    path: '',
    component: OptimalPortfolioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OptimalPortfolioPageRoutingModule {}
