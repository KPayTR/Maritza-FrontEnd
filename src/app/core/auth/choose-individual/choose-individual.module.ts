import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseIndividualPageRoutingModule } from './choose-individual-routing.module';

import { ChooseIndividualPage } from './choose-individual.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseIndividualPageRoutingModule
  ],
  declarations: [ChooseIndividualPage]
})
export class ChooseIndividualPageModule {}
