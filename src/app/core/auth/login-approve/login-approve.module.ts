import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginApprovePageRoutingModule } from './login-approve-routing.module';

import { LoginApprovePage } from './login-approve.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginApprovePageRoutingModule
  ],
  declarations: [LoginApprovePage]
})
export class LoginApprovePageModule {}
