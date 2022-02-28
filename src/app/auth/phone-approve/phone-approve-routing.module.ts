import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhoneApprovePage } from './phone-approve.page';

const routes: Routes = [
  {
    path: '',
    component: PhoneApprovePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhoneApprovePageRoutingModule {}
