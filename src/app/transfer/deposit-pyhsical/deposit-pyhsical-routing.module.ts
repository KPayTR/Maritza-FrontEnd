import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepositPyhsicalPage } from './deposit-pyhsical.page';

const routes: Routes = [
  {
    path: '',
    component: DepositPyhsicalPage
  },
  {
    path: 'physical-approve',
    loadChildren: () => import('./physical-approve/physical-approve.module').then( m => m.PhysicalApprovePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositPyhsicalPageRoutingModule {}
