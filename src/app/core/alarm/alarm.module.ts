import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlarmPageRoutingModule } from './alarm-routing.module';

import { AlarmPage } from './alarm.page';
import { InputNumberModule } from 'primeng/inputnumber';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlarmPageRoutingModule,
    InputNumberModule,
    NgApexchartsModule,
    SharedComponentsModule
  ],
  declarations: [AlarmPage]
})
export class AlarmPageModule {}
