import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificationIndividualPageRoutingModule } from './verification-individual-routing.module';

import { VerificationIndividualPage } from './verification-individual.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    VerificationIndividualPageRoutingModule
  ],
  declarations: [VerificationIndividualPage]
})
export class VerificationIndividualPageModule {}
