import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountCreatePageRoutingModule } from './account-create-routing.module';

import { AccountCreatePage } from './account-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountCreatePageRoutingModule
  ],
  declarations: [AccountCreatePage]
})
export class AccountCreatePageModule {}
