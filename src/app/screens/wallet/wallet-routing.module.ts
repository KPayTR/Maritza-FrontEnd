import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Wallet } from './wallet.page';

const routes: Routes = [
  {
    path: '',
    component: Wallet,
  },
  {
    path: 'asset-detail',
    loadChildren: () => import('./asset-detail/asset-detail.module').then( m => m.AssetDetailPageModule)
  },
  {
    path: 'transaction-history',
    loadChildren: () => import('./transaction-history/transaction-history.module').then( m => m.TransactionHistoryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }
