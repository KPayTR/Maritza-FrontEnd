import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OptimalPortfolioPageRoutingModule } from './optimal-portfolio-routing.module';

import { OptimalPortfolioPage } from './optimal-portfolio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OptimalPortfolioPageRoutingModule
  ],
  declarations: [OptimalPortfolioPage]
})
export class OptimalPortfolioPageModule {}
