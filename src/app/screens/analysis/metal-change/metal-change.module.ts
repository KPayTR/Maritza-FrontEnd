import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MetalChangePageRoutingModule } from './metal-change-routing.module';

import { MetalChangePage } from './metal-change.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MetalChangePageRoutingModule
  ],
  declarations: [MetalChangePage]
})
export class MetalChangePageModule {}
