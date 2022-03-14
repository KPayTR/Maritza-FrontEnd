import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepositCreditCardPage } from './deposit-credit-card.page';

const routes: Routes = [
  {
    path: '',
    component: DepositCreditCardPage
  },
  {
    path: 'choose-card',
    loadChildren: () => import('./choose-card/choose-card.module').then( m => m.ChooseCardPageModule)
  },
  {
    path: 'add-card',
    loadChildren: () => import('./add-card/add-card.module').then( m => m.AddCardPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositCreditCardPageRoutingModule {}
