import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradePage } from './trade.page';

const routes: Routes = [
  {
    path: '',
    component: TradePage,
  },
  {
    path: 'buy',
    loadChildren: () => import('./buy/buy.module').then( m => m.BuyPageModule)
  },
  {
    path: 'sell',
    loadChildren: () => import('./sell/sell.module').then( m => m.SellPageModule)
  },
  {
    path: 'exchange',
    loadChildren: () => import('./exchange/exchange.module').then( m => m.ExchangePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradePageRoutingModule {}
