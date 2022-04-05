import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {InputMaskModule} from 'primeng/inputmask';

import { IonicModule } from '@ionic/angular';

import { AddCardPageRoutingModule } from './add-card-routing.module';

import { AddCardPage } from './add-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCardPageRoutingModule,
    InputMaskModule
  ],
  declarations: [AddCardPage]
})
export class AddCardPageModule {}
