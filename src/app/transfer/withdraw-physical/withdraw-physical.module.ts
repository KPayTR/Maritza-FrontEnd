import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WithdrawPhysicalPageRoutingModule } from './withdraw-physical-routing.module';

import { WithdrawPhysicalPage } from './withdraw-physical.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WithdrawPhysicalPageRoutingModule
  ],
  declarations: [WithdrawPhysicalPage]
})
export class WithdrawPhysicalPageModule {}
