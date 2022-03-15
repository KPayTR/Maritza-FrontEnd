import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WithdrawPyhsicalPage } from './withdraw-pyhsical.page';

const routes: Routes = [
  {
    path: '',
    component: WithdrawPyhsicalPage
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
  },
  {
    path: 'orders-approve-confirm',
    loadChildren: () => import('./orders-approve-confirm/orders-approve-confirm.module').then( m => m.OrdersApproveConfirmPageModule)
  },
  {
    path: 'orders-approve-reject',
    loadChildren: () => import('./orders-approve-reject/orders-approve-reject.module').then( m => m.OrdersApproveRejectPageModule)
  },
  {
    path: 'orders-basket',
    loadChildren: () => import('./orders-basket/orders-basket.module').then( m => m.OrdersBasketPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WithdrawPyhsicalPageRoutingModule {}
