import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersAddressPage } from './orders-address.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersAddressPageRoutingModule {}
