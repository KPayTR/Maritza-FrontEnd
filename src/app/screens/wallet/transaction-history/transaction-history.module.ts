import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionHistoryPageRoutingModule } from './transaction-history-routing.module';

import { TransactionHistoryPage } from './transaction-history.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    TransactionHistoryPageRoutingModule
  ],
  declarations: [TransactionHistoryPage]
})
export class TransactionHistoryPageModule {}
