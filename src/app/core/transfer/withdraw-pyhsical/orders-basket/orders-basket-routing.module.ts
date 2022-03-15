import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersBasketPage } from './orders-basket.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersBasketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersBasketPageRoutingModule {}
