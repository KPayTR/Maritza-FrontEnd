import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankAccountPage } from './bank-account.page';

const routes: Routes = [
  {
    path: '',
    component: BankAccountPage
  },
  {
    path: 'account-approve',
    loadChildren: () => import('./account-approve/account-approve.module').then( m => m.AccountApprovePageModule)
  },
  {
    path: 'account-create',
    loadChildren: () => import('./account-create/account-create.module').then( m => m.AccountCreatePageModule)
  },
  {
    path: 'account-detail',
    loadChildren: () => import('./account-detail/account-detail.module').then( m => m.AccountDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankAccountPageRoutingModule {}
