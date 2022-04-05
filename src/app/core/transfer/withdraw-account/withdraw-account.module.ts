import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

import { IonicModule } from '@ionic/angular';

import { WithdrawAccountPageRoutingModule } from './withdraw-account-routing.module';

import { WithdrawAccountPage } from './withdraw-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WithdrawAccountPageRoutingModule,
    InputNumberModule

  ],
  declarations: [WithdrawAccountPage]
})
export class WithdrawAccountPageModule {}
