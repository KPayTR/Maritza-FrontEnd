import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
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
        path: 'login',
        loadChildren: () =>
          import('./auth/login/login.module').then((m) => m.LoginPageModule),
      },
      {
        path: 'login-approve',
        loadChildren: () =>
          import('./auth/login-approve/login-approve.module').then(
            (m) => m.LoginApprovePageModule
          ),
      },
      {
        path: 'register-approve',
        loadChildren: () =>
          import('./auth/register-approve/register-approve.module').then(
            (m) => m.RegisterApprovePageModule
          ),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./auth/register/register.module').then(
            (m) => m.RegisterPageModule
          ),
      },
      {
        path: 'choose-individual',
        loadChildren: () =>
          import('./auth/choose-individual/choose-individual.module').then(
            (m) => m.ChooseIndividualPageModule
          ),
      },
      {
        path: 'phone-approve',
        loadChildren: () =>
          import('./auth/phone-approve/phone-approve.module').then(
            (m) => m.PhoneApprovePageModule
          ),
      },
    ],
  },
  {
    path: 'user',
    children: [
      {
        path: 'help',
        loadChildren: () =>
          import('./user/help/help.module').then((m) => m.HelpPageModule),
      },
      {
        path: 'language',
        loadChildren: () =>
          import('./user/language/language.module').then(
            (m) => m.LanguagePageModule
          ),
      },
      {
        path: 'security',
        loadChildren: () =>
          import('./user/security/security.module').then(
            (m) => m.SecurityPageModule
          ),
      },
      {
        path: 'history',
        loadChildren: () =>
          import('./user/history/history.module').then(
            (m) => m.HistoryPageModule
          ),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./user/notifications/notifications.module').then(
            (m) => m.NotificationsPageModule
          ),
      },
      {
        path: 'password-change',
        loadChildren: () =>
          import('./user/password-change/password-change.module').then(
            (m) => m.PasswordChangePageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./user/profile/profile.module').then(
            (m) => m.ProfilePageModule
          ),
      },
      {
        path: 'transaction-limits',
        loadChildren: () =>
          import('./user/transaction-limits/transaction-limits.module').then(
            (m) => m.TransactionLimitsPageModule
          ),
      },
    ],
  },
  {
    path: 'buySell',
    children: [
      {
        path: 'buy',
        loadChildren: () =>
          import('./buySell/buy/buy.module').then((m) => m.BuyPageModule),
      },
      {
        path: 'sell',
        loadChildren: () =>
          import('./buySell/sell/sell.module').then((m) => m.SellPageModule),
      },
      {
        path: 'convert',
        loadChildren: () =>
          import('./buySell/convert/convert.module').then(
            (m) => m.ConvertPageModule
          ),
      },
    ],
  },
  {
    path: 'transfer',
    children: [
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
        path: 'withdraw-physical',
        loadChildren: () => import('./transfer/withdraw-physical/withdraw-physical.module').then( m => m.WithdrawPhysicalPageModule)
      },
    ]
  },   {
    path: 'qr',
    loadChildren: () => import('./qr/qr.module').then( m => m.QrPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
