import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountApprovePageRoutingModule } from './account-approve-routing.module';

import { AccountApprovePage } from './account-approve.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountApprovePageRoutingModule
  ],
  declarations: [AccountApprovePage]
})
export class AccountApprovePageModule {}
