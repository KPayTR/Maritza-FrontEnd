import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then((m) => m.LoginPageModule),
      },
      {
        path: 'login-approve',
        loadChildren: () =>
          import('./login-approve/login-approve.module').then(
            (m) => m.LoginApprovePageModule
          ),
      },
      {
        path: 'register-approve',
        loadChildren: () =>
          import('./register-approve/register-approve.module').then(
            (m) => m.RegisterApprovePageModule
          ),
      },
      {
        path: 'register/:id',
        loadChildren: () =>
          import('./register/register.module').then(
            (m) => m.RegisterPageModule
          ),
      },
      {
        path: 'choose-individual',
        loadChildren: () =>
          import('./choose-individual/choose-individual.module').then(
            (m) => m.ChooseIndividualPageModule
          ),
      },
      {
        path: 'phone-approve',
        loadChildren: () =>
          import('./phone-approve/phone-approve.module').then(
            (m) => m.PhoneApprovePageModule
          ),
      },
    ]
  },

  {
    path: 'verification-corporate',
    loadChildren: () => import('./verification-corporate/verification-corporate.module').then(m => m.VerificationCorporatePageModule)
  },
  {
    path: 'verification-individual',
    loadChildren: () => import('./verification-individual/verification-individual.module').then(m => m.VerificationIndividualPageModule)
  },
  {
    path: 'verification-complate',
    loadChildren: () => import('./verification-complate/verification-complate.module').then(m => m.VerificationComplatePageModule)
  },
  {
    path: 'verification-notification',
    loadChildren: () => import('./verification-notification/verification-notification.module').then(m => m.VerificationNotificationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule { }
