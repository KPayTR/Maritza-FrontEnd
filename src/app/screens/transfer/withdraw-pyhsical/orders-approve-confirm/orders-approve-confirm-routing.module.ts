import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersApproveConfirmPage } from './orders-approve-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersApproveConfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersApproveConfirmPageRoutingModule {}
