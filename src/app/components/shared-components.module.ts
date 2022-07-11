import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TradingChartComponent } from './trading-chart/trading-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { CandleChartComponent } from './candle-chart/candle-chart.component';
import { GaugeChartComponent } from './gauge-chart/gauge-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { MiniLineChartComponent } from './mini-line-chart/mini-line-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
    declarations: [
        TradingChartComponent,
        BarChartComponent,
        CandleChartComponent,
        GaugeChartComponent,
        LineChartComponent,
        MiniLineChartComponent,
        PieChartComponent,
        PrivacyPolicyComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        IonicModule,
        RouterModule,
        NgApexchartsModule
    ],
    exports: [
        TradingChartComponent,
        BarChartComponent,
        CandleChartComponent,
        GaugeChartComponent,
        LineChartComponent,
        MiniLineChartComponent,
        PieChartComponent,
        PrivacyPolicyComponent

    ]
})
export class SharedComponentsModule {
}
