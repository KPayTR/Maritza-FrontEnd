import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordApprovePageRoutingModule } from './password-approve-routing.module';

import { PasswordApprovePage } from './password-approve.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordApprovePageRoutingModule
  ],
  declarations: [PasswordApprovePage]
})
export class PasswordApprovePageModule {}
