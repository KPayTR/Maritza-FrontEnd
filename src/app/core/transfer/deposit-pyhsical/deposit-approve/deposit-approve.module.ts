import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepositApprovePageRoutingModule } from './deposit-approve-routing.module';

import { DepositApprovePage } from './deposit-approve.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepositApprovePageRoutingModule
  ],
  declarations: [DepositApprovePage]
})
export class DepositApprovePageModule {}
