import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankDetailPageRoutingModule } from './bank-detail-routing.module';

import { BankDetailPage } from './bank-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BankDetailPageRoutingModule
  ],
  declarations: [BankDetailPage]
})
export class BankDetailPageModule {}
