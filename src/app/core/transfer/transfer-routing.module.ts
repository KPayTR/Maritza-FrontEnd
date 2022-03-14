import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferPage } from './transfer.page';

const routes: Routes = [
  {
    path: '',
    component: TransferPage,
  },
  {
    path: 'deposit-credit-card',
    loadChildren: () => import('./deposit-credit-card/deposit-credit-card.module').then( m => m.DepositCreditCardPageModule)
  },
  {
    path: 'deposit-eft',
    loadChildren: () => import('./deposit-eft/deposit-eft.module').then( m => m.DepositEftPageModule)
  },
  {
    path: 'deposit-pyhsical',
    loadChildren: () => import('./deposit-pyhsical/deposit-pyhsical.module').then( m => m.DepositPyhsicalPageModule)
  },
  {
    path: 'withdraw-account',
    loadChildren: () => import('./withdraw-account/withdraw-account.module').then( m => m.WithdrawAccountPageModule)
  },
  {
    path: 'withdraw-pyhsical',
    loadChildren: () => import('./withdraw-pyhsical/withdraw-pyhsical.module').then( m => m.WithdrawPyhsicalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferPageRoutingModule {}
