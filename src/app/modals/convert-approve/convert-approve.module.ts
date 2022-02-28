import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConvertApprovePageRoutingModule } from './convert-approve-routing.module';

import { ConvertApprovePage } from './convert-approve.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConvertApprovePageRoutingModule
  ],
  declarations: [ConvertApprovePage]
})
export class ConvertApprovePageModule {}
