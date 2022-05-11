import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../screens/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'modals',
    children: [
      {
        path: 'menu',
        loadChildren: () =>
          import('./modals/menu/menu.module').then((m) => m.MenuPageModule),
      },
      {
        path: 'convert-approve',
        loadChildren: () =>
          import('./modals/convert-approve/convert-approve.module').then(
            (m) => m.ConvertApprovePageModule
          ),
      },
    ],
  },
  {
    path: 'auth',
    children: [
      { 
        path: '',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthPageModule),
      }
    ],
  },
  {
    path:"transfer",
    canActivate: [AuthGuard],
    children:[
      {
        path: 'deposit-credit-card',
        loadChildren: () => import('./transfer/deposit-credit-card/deposit-credit-card.module').then( m => m.DepositCreditCardPageModule)
      },
      {
        path: 'deposit-eft',
        loadChildren: () => import('./transfer/deposit-eft/deposit-eft.module').then( m => m.DepositEftPageModule)
      },
      {
        path: 'deposit-pyhsical',
        loadChildren: () => import('./transfer/deposit-pyhsical/deposit-pyhsical.module').then( m => m.DepositPyhsicalPageModule)
      },
      {
        path: 'withdraw-account',
        loadChildren: () => import('./transfer/withdraw-account/withdraw-account.module').then( m => m.WithdrawAccountPageModule)
      },
      {
        path: 'withdraw-pyhsical',
        loadChildren: () => import('./transfer/withdraw-pyhsical/withdraw-pyhsical.module').then( m => m.WithdrawPyhsicalPageModule)
      }
    ]
  },
  {
    path: 'alarm',
    loadChildren: () => import('./alarm/alarm.module').then( m => m.AlarmPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
