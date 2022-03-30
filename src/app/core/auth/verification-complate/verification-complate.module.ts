import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificationComplatePageRoutingModule } from './verification-complate-routing.module';

import { VerificationComplatePage } from './verification-complate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificationComplatePageRoutingModule
  ],
  declarations: [VerificationComplatePage]
})
export class VerificationComplatePageModule {}
