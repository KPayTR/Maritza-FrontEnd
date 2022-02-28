import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhysicalApprovePageRoutingModule } from './physical-approve-routing.module';

import { PhysicalApprovePage } from './physical-approve.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhysicalApprovePageRoutingModule
  ],
  declarations: [PhysicalApprovePage]
})
export class PhysicalApprovePageModule {}
