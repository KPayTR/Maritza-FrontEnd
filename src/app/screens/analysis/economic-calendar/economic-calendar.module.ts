import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EconomicCalendarPageRoutingModule } from './economic-calendar-routing.module';

import { EconomicCalendarPage } from './economic-calendar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EconomicCalendarPageRoutingModule
  ],
  declarations: [EconomicCalendarPage]
})
export class EconomicCalendarPageModule {}
