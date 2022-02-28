import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersAddressPageRoutingModule } from './orders-address-routing.module';

import { OrdersAddressPage } from './orders-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersAddressPageRoutingModule
  ],
  declarations: [OrdersAddressPage]
})
export class OrdersAddressPageModule {}
