import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/helpers/auth.guard';
import { TabsPage } from './tabs.page'; 

const routes: Routes = [
  {
    path: 'app',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'wallet',
        //canActivate: [AuthGuard],
        loadChildren: () => import('../wallet/wallet.module').then(m => m.WalletModule)
      },
      {
        path: 'analysis',
        //canActivate: [AuthGuard],
        loadChildren: () => import('../analysis/analysis.module').then(m => m.AnalysisPageModule)
      },
      {
        path: 'trade',
        //canActivate: [AuthGuard],
        loadChildren: () => import('../trade/trade.module').then(m => m.TradePageModule)
      },
      // {
      //   path: 'transfer',
      //   loadChildren: () => import('../transfer/transfer.module').then(m => m.TransferPageModule)
      // }, 
      {
        path: '',
        redirectTo: '/app/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/app/home',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
