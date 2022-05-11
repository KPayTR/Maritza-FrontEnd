import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { createChart, CrosshairMode, IChartApi, ISeriesApi, SingleValueData, UTCTimestamp, WhitespaceData } from 'lightweight-charts';
import UniqueId from 'src/app/helpers/UniqueId';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-mini-line-chart',
  templateUrl: './mini-line-chart.component.html',
  styleUrls: ['./mini-line-chart.component.scss'],
})
export class MiniLineChartComponent implements AfterViewInit {

  chartId = 'chart_' + (new UniqueId().randomUUID(6));

  darkTheme = {
    chart: {
      layout: {
        backgroundColor: '#21252f',
        lineColor: '#2B2B43',
        textColor: '#D9D9D9',
      },
      watermark: {
        color: 'rgba(0, 0, 0, 0)',
      },
      crosshair: {
        color: '#758696',
      },
      grid: {
        vertLines: {
          color: '#2B2B43',
        },
        horzLines: {
          color: '#363C4E',
        },
      },
    },
    series: {
      topColor: 'rgba(254, 81, 80, 0.54)',
      bottomColor: 'rgba(254, 81, 80, 0)',
      lineColor: 'rgba(254, 81, 80, 1)',
    },
    seriesIncreasing: {
      topColor: 'rgba(22, 199, 132, 0.54)',
      bottomColor: 'rgba(22, 199, 132, 0.04)',
      lineColor: 'rgba(22, 199, 132, 1)',
    },
  };

  lightTheme = {
    chart: {
      layout: {
        backgroundColor: '#FFFFFF',
        lineColor: '#2B2B43',
        textColor: '#191919',
      },
      watermark: {
        color: 'rgba(0, 0, 0, 0)',
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          color: '#ECE9F1',
        },
      },
    },
    series: {
      topColor: 'rgba(254, 81, 80, 0.54)',
      bottomColor: 'rgba(254, 81, 80, 0)',
      lineColor: 'rgba(254, 81, 80, 1)',
    },
    seriesIncreasing: {
      topColor: 'rgba(22, 199, 132, 0.54)',
      bottomColor: 'rgba(22, 199, 132, 0)',
      lineColor: 'rgba(22, 199, 132, 1)',
    },
  };

  themesData = {
    Dark: this.darkTheme,
    Light: this.lightTheme,
  };

  private chartData: (SingleValueData | WhitespaceData)[];

  private _isIncreasing = false;

  @Input()
  set isIncreasing(v: boolean) {
    this._isIncreasing = v;
  }

  @Input()
  set data(v: {
    time: UTCTimestamp,
    value: number
  }[]) {
    if (v != undefined && v.length > 0) {
      this.chartData = v;
      if (this.baseLineSeries) {
        this.baseLineSeries.setData(v);
        this.chart.timeScale().fitContent();
      }
    }
  };

  chart: IChartApi;
  baseLineSeries: ISeriesApi<"Baseline">;

  constructor(
    private appService: AppService
  ) { }

  ngAfterViewInit() {
    this.initChart();
    this.appService.themeChange.subscribe(() => {
      const theme: any = document.getElementsByTagName('body')[0].classList.contains('dark') ? 'Light' : 'Dark';
      this.chart.applyOptions(this.themesData[theme].chart);
    })
  }
  initChart() {
    var chartElement = document.getElementById(this.chartId);

    this.chart = createChart(chartElement, {
      width: 48,
      height: 48,
      layout: {
        fontFamily: 'var(--ion-font-family)',
      },
      grid: {
        horzLines: {
          visible: false,
        },
        vertLines: {
          visible: false
        }
      },
      rightPriceScale: {
        visible: false,
        borderVisible: false,
      },
      leftPriceScale: {
        visible: false,
        borderVisible: false,
      },
      timeScale: {
        visible: false,
        borderVisible: false,
        fixLeftEdge: true,
        fixRightEdge: true,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        horzLine: {
          visible: false,
        },
        vertLine: {
          visible: false
        }
      },
      handleScale: false,
      handleScroll: false
    });

    const theme: any = document.getElementsByTagName('body')[0].classList.contains('dark') ? 'Dark' : 'Light';
    const themeSeries = this._isIncreasing ? this.themesData[theme].seriesIncreasing : this.themesData[theme].series;

    this.baseLineSeries = this.chart.addBaselineSeries({
      lineWidth: 2,
      crosshairMarkerVisible: false,
      lastValueVisible: false,
      priceLineVisible: false,
      topLineColor: themeSeries.lineColor,
      topFillColor1: themeSeries.topColor,
      bottomFillColor1: themeSeries.bottomColor
    });


    this.chart.applyOptions(this.themesData[theme].chart);

    if (this.chartData) {
      this.baseLineSeries.setData(this.chartData);
    }
  }
}
