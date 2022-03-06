import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MultipliersPageRoutingModule } from './multipliers-routing.module';

import { MultipliersPage } from './multipliers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MultipliersPageRoutingModule
  ],
  declarations: [MultipliersPage]
})
export class MultipliersPageModule {}
