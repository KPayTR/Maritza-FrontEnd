import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexPlotOptions,
  ApexDataLabels,
  ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
};

@Component({
  selector: 'app-wallet',
  templateUrl: 'wallet.page.html',
  styleUrls: ['wallet.page.scss']
})
export class Wallet {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  assets: any = [
    {
      symbol: 'Altın',
      isPrimary: false,
      price: 1200,
      amountGR: 10,
      amountTRY: 20000,
      color: 'rgba(248, 192, 47, 1)'
    },
    {
      symbol: 'Gümüş',
      isPrimary: false,
      price: 1200,
      amountGR: 10,
      amountTRY: 3000,
      color: 'rgba(234, 234, 234)'
    },
    {
      symbol: 'Paladyum',
      isPrimary: false,
      price: 1200,
      amountGR: 10,
      amountTRY: 5000,
      color: 'rgba(186, 181, 181)'
    },
    {
      symbol: 'Platin',
      isPrimary: false,
      price: 1200,
      amountGR: 10,
      amountTRY: 6000,
      color: 'rgba(55, 54, 54, 1)'
    },
    {
      symbol: 'Nakit',
      isPrimary: true,
      price: 0,
      amountGR: 0,
      amountTRY: 10000,
      color: 'rgba(2, 117, 74)'
    }
  ];
  series: any = [];
  colors: any = [];
  selectedItem: any;
  selectedSegment = 'assets';

  constructor(
    private router: Router
  ) {
    this.chartOptions = {
      chart: {
        type: "donut",
        events: {
          dataPointSelection: (event, chartContext, config) => {
            this.selectedItem = this.assets[config.dataPointIndex];
          }
        }
      },
      labels: this.assets.map(x => x.symbol),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              show: false
            }
          }
        }
      ],
      fill: {
        type: "gradient"
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: false,
              name: {
                color: 'orange'
              }
            }
          }
        }
      }
    };
  }

  ionViewDidEnter() {
    this.colors= this.assets.map(x => x.color);
    this.series = this.assets.map(x => x.amountTRY);;
  }

  segmentChange(e) {
    this.selectedSegment = e.detail.value;
  }

  goBuy(){
    this.router.navigate(['app/trade/buy'])
  }
  goSell(){
    this.router.navigate(['app/trade/sell'])
  }
  goDeposit(){
    this.router.navigate(['app/transfer/deposit-credit-card'])
  }
  goWithdraw(){
    this.router.navigate(['app/transfer/withdraw-account'])
  }
}
