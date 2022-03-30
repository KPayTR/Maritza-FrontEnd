import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPage
  },
  {
    path: 'verification-corporate',
    loadChildren: () => import('./verification-corporate/verification-corporate.module').then( m => m.VerificationCorporatePageModule)
  },
  {
    path: 'verification-individual',
    loadChildren: () => import('./verification-individual/verification-individual.module').then( m => m.VerificationIndividualPageModule)
  },
  {
    path: 'verification-complate',
    loadChildren: () => import('./verification-complate/verification-complate.module').then( m => m.VerificationComplatePageModule)
  },
  {
    path: 'verification-notifiication',
    loadChildren: () => import('./verification-notifiication/verification-notifiication.module').then( m => m.VerificationNotifiicationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
