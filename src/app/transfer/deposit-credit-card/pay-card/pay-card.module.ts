import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayCardPageRoutingModule } from './pay-card-routing.module';

import { PayCardPage } from './pay-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayCardPageRoutingModule
  ],
  declarations: [PayCardPage]
})
export class PayCardPageModule {}
