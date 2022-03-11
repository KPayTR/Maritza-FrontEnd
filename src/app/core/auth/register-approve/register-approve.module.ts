import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterApprovePageRoutingModule } from './register-approve-routing.module';

import { RegisterApprovePage } from './register-approve.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterApprovePageRoutingModule
  ],
  declarations: [RegisterApprovePage]
})
export class RegisterApprovePageModule {}
