import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileApprovePage } from './profile-approve.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileApprovePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileApprovePageRoutingModule {}
