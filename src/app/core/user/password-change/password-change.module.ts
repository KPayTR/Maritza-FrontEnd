import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordChangePageRoutingModule } from './password-change-routing.module';

import { PasswordChangePage } from './password-change.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PasswordChangePageRoutingModule
  ],
  declarations: [PasswordChangePage]
})
export class PasswordChangePageModule {}
