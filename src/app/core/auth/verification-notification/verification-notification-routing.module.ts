import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificationNotificationPage } from './verification-notification.page';

const routes: Routes = [
  {
    path: '',
    component: VerificationNotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationNotificationPageRoutingModule {}
