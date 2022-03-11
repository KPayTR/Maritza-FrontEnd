import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepositPyhsicalPage } from './deposit-pyhsical.page';

const routes: Routes = [
  {
    path: '',
    component: DepositPyhsicalPage
  },
  {
    path: 'deposit-approve',
    loadChildren: () => import('./deposit-approve/deposit-approve.module').then( m => m.DepositApprovePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositPyhsicalPageRoutingModule {}
