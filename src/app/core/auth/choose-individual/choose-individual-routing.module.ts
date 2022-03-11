import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseIndividualPage } from './choose-individual.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseIndividualPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseIndividualPageRoutingModule {}
