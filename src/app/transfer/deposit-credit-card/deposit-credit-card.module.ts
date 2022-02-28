import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepositCreditCardPageRoutingModule } from './deposit-credit-card-routing.module';

import { DepositCreditCardPage } from './deposit-credit-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepositCreditCardPageRoutingModule
  ],
  declarations: [DepositCreditCardPage]
})
export class DepositCreditCardPageModule {}
