import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionLimitsPageRoutingModule } from './transaction-limits-routing.module';

import { TransactionLimitsPage } from './transaction-limits.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionLimitsPageRoutingModule
  ],
  declarations: [TransactionLimitsPage]
})
export class TransactionLimitsPageModule {}
