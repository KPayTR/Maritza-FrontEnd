import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Wallet } from './wallet.page';

import { WalletRoutingModule } from './wallet-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    WalletRoutingModule
  ],
  declarations: [Wallet]
})
export class WalletModule {}
