import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApproveAccountPageRoutingModule } from './approve-account-routing.module';

import { ApproveAccountPage } from './approve-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApproveAccountPageRoutingModule
  ],
  declarations: [ApproveAccountPage]
})
export class ApproveAccountPageModule {}
