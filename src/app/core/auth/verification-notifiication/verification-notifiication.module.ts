import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificationNotifiicationPageRoutingModule } from './verification-notifiication-routing.module';

import { VerificationNotifiicationPage } from './verification-notifiication.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificationNotifiicationPageRoutingModule
  ],
  declarations: [VerificationNotifiicationPage]
})
export class VerificationNotifiicationPageModule {}
