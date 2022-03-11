import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasswordApprovePage } from './password-approve.page';

const routes: Routes = [
  {
    path: '',
    component: PasswordApprovePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordApprovePageRoutingModule {}
