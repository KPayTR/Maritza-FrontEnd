import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
    path: 'bank-account',
    loadChildren: () => import('./bank-account/bank-account.module').then( m => m.BankAccountPageModule)
  },
  {
    path: 'profile-approve',
    loadChildren: () => import('./profile-approve/profile-approve.module').then( m => m.ProfileApprovePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
