import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepositEftPageRoutingModule } from './deposit-eft-routing.module';

import { DepositEftPage } from './deposit-eft.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepositEftPageRoutingModule
  ],
  declarations: [DepositEftPage]
})
export class DepositEftPageModule {}
