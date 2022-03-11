import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApproveAccountPage } from './approve-account.page';

const routes: Routes = [
  {
    path: '',
    component: ApproveAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApproveAccountPageRoutingModule {}
