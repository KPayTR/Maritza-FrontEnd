import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular'; 
import { DepositPyhsicalPageRoutingModule } from './deposit-pyhsical-routing.module';
//import {CalendarModule} from 'primeng/calendar';
import { DepositPyhsicalPage } from './deposit-pyhsical.page';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    //CalendarModule, 
    InputNumberModule,
    DepositPyhsicalPageRoutingModule,
    
  ],
  declarations: [DepositPyhsicalPage]
})
export class DepositPyhsicalPageModule {}
