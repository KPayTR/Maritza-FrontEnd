import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersApproveRejectPageRoutingModule } from './orders-approve-reject-routing.module';

import { OrdersApproveRejectPage } from './orders-approve-reject.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersApproveRejectPageRoutingModule
  ],
  declarations: [OrdersApproveRejectPage]
})
export class OrdersApproveRejectPageModule {}
