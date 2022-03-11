import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhoneApprovePageRoutingModule } from './phone-approve-routing.module';

import { PhoneApprovePage } from './phone-approve.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhoneApprovePageRoutingModule
  ],
  declarations: [PhoneApprovePage]
})
export class PhoneApprovePageModule {}
