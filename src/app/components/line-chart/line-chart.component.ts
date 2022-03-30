import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { createChart, CrosshairMode, IChartApi, ISeriesApi, SingleValueData, UTCTimestamp, WhitespaceData } from 'lightweight-charts';
import UniqueId from 'src/app/helpers/UniqueId';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements AfterViewInit {

  chartId = 'chart_' + (new UniqueId().randomUUID(6));

  darkTheme = {
    chart: {
      layout: {
        backgroundColor: '#2B2B43',
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

  @Input()
  set data(v: {
    time: UTCTimestamp,
    value: number
  }[]) {
    if (v != undefined && v.length > 0) {
      this.chartData = v;
      if (this.areaSeries) {
        this.areaSeries.setData(v);
        this.chart.timeScale().fitContent();
      }
    }
  };

  chart: IChartApi;
  areaSeries: ISeriesApi<"Area">;

  constructor() { }

  ngAfterViewInit() {
    this.initChart();
  }
  initChart() {
    var switcherElement = this.createSimpleSwitcher(['Dark', 'Light'], 'Dark', this.syncToTheme);

    var chartElement = document.getElementById(this.chartId);

    this.chart = createChart(chartElement, {
      width: window.innerWidth - 32,
      height: 200,
      layout: {
        fontFamily: 'var(--ion-font-family)',
      },
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
        fixLeftEdge: true,
        fixRightEdge: true
      },
      crosshair: {
        mode: CrosshairMode.Magnet
      },
      handleScale: false,
      handleScroll: false
    });

    this.areaSeries = this.chart.addAreaSeries({
      topColor: 'rgba(33, 150, 243, 0.56)',
      bottomColor: 'rgba(33, 150, 243, 0.04)',
      lineColor: 'rgba(33, 150, 243, 1)',
      lineWidth: 2,
    });

    if (this.chartData) {
      this.areaSeries.setData(this.chartData);
    }

    this.syncToTheme('Light');
  }

  syncToTheme(theme) {
    this.chart.applyOptions(this.themesData[theme].chart);
    this.areaSeries.applyOptions(this.themesData[theme].series);
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
