import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransferPage } from './transfer.page';

import { TransferPageRoutingModule } from './transfer-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TransferPage }]),
    TransferPageRoutingModule,
  ],
  declarations: [TransferPage]
})
export class TransferPageModule {}
