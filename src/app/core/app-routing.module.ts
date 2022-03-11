import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
      },
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
        path: 'register/:id',
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
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
