import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersApproveConfirmPageRoutingModule } from './orders-approve-confirm-routing.module';

import { OrdersApproveConfirmPage } from './orders-approve-confirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersApproveConfirmPageRoutingModule
  ],
  declarations: [OrdersApproveConfirmPage]
})
export class OrdersApproveConfirmPageModule {}
