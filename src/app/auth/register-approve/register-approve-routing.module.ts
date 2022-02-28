import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterApprovePage } from './register-approve.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterApprovePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterApprovePageRoutingModule {}
