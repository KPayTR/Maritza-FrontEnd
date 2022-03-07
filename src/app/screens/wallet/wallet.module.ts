import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Wallet } from './wallet.page';

import { WalletRoutingModule } from './wallet-routing.module';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    WalletRoutingModule,
    NgApexchartsModule,
    SharedComponentsModule
  ],
  declarations: [Wallet]
})
export class WalletModule {}
