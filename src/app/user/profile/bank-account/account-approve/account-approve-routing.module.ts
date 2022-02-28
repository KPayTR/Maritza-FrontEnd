import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountApprovePage } from './account-approve.page';

const routes: Routes = [
  {
    path: '',
    component: AccountApprovePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountApprovePageRoutingModule {}
