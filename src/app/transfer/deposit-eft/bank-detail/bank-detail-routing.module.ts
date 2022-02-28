import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankDetailPage } from './bank-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BankDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankDetailPageRoutingModule {}
