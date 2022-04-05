import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificationNotificationPageRoutingModule } from './verification-notification-routing.module';

import { VerificationNotificationPage } from './verification-notification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificationNotificationPageRoutingModule
  ],
  declarations: [VerificationNotificationPage]
})
export class VerificationNotificationPageModule {}
