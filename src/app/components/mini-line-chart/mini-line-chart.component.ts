import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { createChart, CrosshairMode, IChartApi, ISeriesApi, SingleValueData, UTCTimestamp, WhitespaceData } from 'lightweight-charts';
import UniqueId from 'src/app/helpers/UniqueId';

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
      topColor: 'rgba(32, 226, 47, 0.56)',
      bottomColor: 'rgba(32, 226, 47, 0.04)',
      lineColor: 'rgba(32, 226, 47, 1)',
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
      topColor: 'rgba(255, 213, 67, 0.9)',
      bottomColor: 'rgba(255, 213, 67, 0.04)',
      lineColor: 'rgba(255, 213, 67, 1)',
    },
  };

  themesData = {
    Dark: this.darkTheme,
    Light: this.lightTheme,
  };

  private chartData: (SingleValueData | WhitespaceData)[];

  private _isIncreasing = false;
  
  @Input()
  set isIncreasing(v:boolean) {
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

  constructor() { }

  ngAfterViewInit() {
    this.initChart();
  }
  initChart() {
    var switcherElement = this.createSimpleSwitcher(['Dark', 'Light'], 'Dark', this.syncToTheme);

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

    this.baseLineSeries = this.chart.addBaselineSeries({
      lineWidth: 2,
      crosshairMarkerVisible: false,
      lastValueVisible: false,
      priceLineVisible: false,
    });

    if (this.chartData) {
      this.baseLineSeries.setData(this.chartData);
    }

    const theme = document.getElementsByTagName('body')[0].classList.contains('dark') ? 'Dark' : 'Light';
    this.syncToTheme(theme);
  }

  syncToTheme(theme) {
    this.chart.applyOptions(this.themesData[theme].chart);
    this.baseLineSeries.applyOptions(this.themesData[theme].series);
  }

  createSimpleSwitcher(items, activeItem, activeItemChangedCallback) {
    var switcherElement = document.createElement('div');
    switcherElement.classList.add('switcher');

    var intervalElements = items.map(function (item) {
      var itemEl = document.createElement('button');
      itemEl.innerText = item;
      itemEl.classList.add('switcher-item');
      itemEl.classList.toggle('switcher-active-item', item === activeItem);
      itemEl.addEventListener('click', function () {
        onItemClicked(item);
      });
      switcherElement.appendChild(itemEl);
      return itemEl;
    });

    function onItemClicked(item) {
      if (item === activeItem) {
        return;
      }

      intervalElements.forEach(function (element, index) {
        element.classList.toggle('switcher-active-item', items[index] === item);
      });

      activeItem = item;

      activeItemChangedCallback(item);
    }

    return switcherElement;
  }



}
