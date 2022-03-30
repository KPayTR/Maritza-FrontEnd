import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificationIndividualPage } from './verification-individual.page';

const routes: Routes = [
  {
    path: '',
    component: VerificationIndividualPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationIndividualPageRoutingModule {}
