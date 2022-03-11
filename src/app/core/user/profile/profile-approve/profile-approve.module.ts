import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileApprovePageRoutingModule } from './profile-approve-routing.module';

import { ProfileApprovePage } from './profile-approve.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileApprovePageRoutingModule
  ],
  declarations: [ProfileApprovePage]
})
export class ProfileApprovePageModule {}
