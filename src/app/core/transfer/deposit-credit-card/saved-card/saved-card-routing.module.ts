import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedCardPage } from './saved-card.page';

const routes: Routes = [
  {
    path: '',
    component: SavedCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedCardPageRoutingModule {}
