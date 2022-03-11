import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionLimitsPage } from './transaction-limits.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionLimitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionLimitsPageRoutingModule {}
