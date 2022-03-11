import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WithdrawAccountPage } from './withdraw-account.page';

const routes: Routes = [
  {
    path: '',
    component: WithdrawAccountPage
  },
  {
    path: 'approve-account',
    loadChildren: () => import('./approve-account/approve-account.module').then( m => m.ApproveAccountPageModule)
  },
  {
    path: 'choose-account',
    loadChildren: () => import('./choose-account/choose-account.module').then( m => m.ChooseAccountPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WithdrawAccountPageRoutingModule {}
