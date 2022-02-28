import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersApprovePageRoutingModule } from './orders-approve-routing.module';

import { OrdersApprovePage } from './orders-approve.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersApprovePageRoutingModule
  ],
  declarations: [OrdersApprovePage]
})
export class OrdersApprovePageModule {}
