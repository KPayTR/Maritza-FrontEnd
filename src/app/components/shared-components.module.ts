import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { TradingChartComponent } from './trading-chart/trading-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { CandleChartComponent } from './candle-chart/candle-chart.component';
import { GaugeChartComponent } from './gauge-chart/gauge-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

@NgModule({
    declarations: [
        TradingChartComponent,
        BarChartComponent,
        CandleChartComponent,
        GaugeChartComponent,
        LineChartComponent,
        PieChartComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        IonicModule,
        RouterModule
    ],
    exports: [
        TradingChartComponent,
        BarChartComponent,
        CandleChartComponent,
        GaugeChartComponent,
        LineChartComponent,
        PieChartComponent
    ]
})
export class SharedComponentsModule {
}
