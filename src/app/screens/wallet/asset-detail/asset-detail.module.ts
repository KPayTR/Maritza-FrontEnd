import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssetDetailPageRoutingModule } from './asset-detail-routing.module';

import { AssetDetailPage } from './asset-detail.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,SharedComponentsModule,
    IonicModule,
    AssetDetailPageRoutingModule
  ],
  declarations: [AssetDetailPage]
})
export class AssetDetailPageModule {}
