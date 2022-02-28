import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginApprovePage } from './login-approve.page';

const routes: Routes = [
  {
    path: '',
    component: LoginApprovePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginApprovePageRoutingModule {}
