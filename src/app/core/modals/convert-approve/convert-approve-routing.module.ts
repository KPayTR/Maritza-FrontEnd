import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConvertApprovePage } from './convert-approve.page';

const routes: Routes = [
  {
    path: '',
    component: ConvertApprovePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConvertApprovePageRoutingModule {}
