import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepositEftPage } from './deposit-eft.page';

const routes: Routes = [
  {
    path: '',
    component: DepositEftPage
  },
  {
    path: 'bank-detail',
    loadChildren: () => import('./bank-detail/bank-detail.module').then( m => m.BankDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositEftPageRoutingModule {}
