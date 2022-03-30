import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificationCorporatePage } from './verification-corporate.page';

const routes: Routes = [
  {
    path: '',
    component: VerificationCorporatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationCorporatePageRoutingModule {}
