import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TradePage } from './trade.page';

import { TradePageRoutingModule } from './trade-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TradePage }]),
    TradePageRoutingModule,
  ],
  declarations: [TradePage]
})
export class TradePageModule {}
