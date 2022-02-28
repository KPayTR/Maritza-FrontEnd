import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhysicalApprovePage } from './physical-approve.page';

const routes: Routes = [
  {
    path: '',
    component: PhysicalApprovePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhysicalApprovePageRoutingModule {}
