import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersApprovePage } from './orders-approve.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersApprovePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersApprovePageRoutingModule {}
