import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MetalChangePage } from './metal-change.page';

const routes: Routes = [
  {
    path: '',
    component: MetalChangePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetalChangePageRoutingModule {}
