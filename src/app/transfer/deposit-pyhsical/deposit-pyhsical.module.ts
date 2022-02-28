import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepositPyhsicalPageRoutingModule } from './deposit-pyhsical-routing.module';

import { DepositPyhsicalPage } from './deposit-pyhsical.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepositPyhsicalPageRoutingModule
  ],
  declarations: [DepositPyhsicalPage]
})
export class DepositPyhsicalPageModule {}
