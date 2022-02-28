import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WithdrawPhysicalPage } from './withdraw-physical.page';

const routes: Routes = [
  {
    path: '',
    component: WithdrawPhysicalPage
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'orders-address',
    loadChildren: () => import('./orders-address/orders-address.module').then( m => m.OrdersAddressPageModule)
  },
  {
    path: 'orders-approve',
    loadChildren: () => import('./orders-approve/orders-approve.module').then( m => m.OrdersApprovePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WithdrawPhysicalPageRoutingModule {}
