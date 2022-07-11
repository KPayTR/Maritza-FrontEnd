import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MultipliersPageRoutingModule } from './multipliers-routing.module';

import { MultipliersPage } from './multipliers.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    MultipliersPageRoutingModule
  ],
  declarations: [MultipliersPage]
})
export class MultipliersPageModule {}
