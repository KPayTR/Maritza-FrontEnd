import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersApproveRejectPage } from './orders-approve-reject.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersApproveRejectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersApproveRejectPageRoutingModule {}
