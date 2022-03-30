import { Component, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexPlotOptions,
  ApexDataLabels,
  ApexFill
} from "ng-apexcharts";
import { GraphicDataModel, MatriksApiService, } from 'src/app/services/api-yatirimim.service';
import { AppService } from 'src/app/services/app.service';
import { MarketDataService } from 'src/app/services/market-data.service';

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
  selectedSegment = 'gold';
  selectedSegmentVal = 'assets';
  selectedChartType = 'line';
  lineData: any[] = []
  candleData: any[] = []
  selectedTimeRange = '15';
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  // symbol: SymbolRateModel;
  // symbols: SymbolRateModel[];
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

  constructor(
    private marketDataService: MarketDataService,
    private zone: NgZone,
    private appService: AppService,
    private matriksService: MatriksApiService,
    private router: Router
  ) {
    // if (marketDataService.symbols == null) {
    //   marketDataService.symbolsLoad.subscribe(v => {
    //     this.loadSegmentData();
    //   })
    // }
    // else {
    //   this.loadSegmentData();
    // }
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
  loadSegmentData() {
    // if (this.marketDataService.symbols == null) return;

    // switch (this.selectedSegment) {
    //   case 'gold':
    //     this.symbol = this.marketDataService.symbols.filter(q => q.matriksCode == "SGLD")[0]
    //     break;
    //   case 'silver':
    //     this.symbol = this.marketDataService.symbols.filter(q => q.matriksCode == "SXAGGR")[0];
    //     break;
    //   case 'palladium':
    //     this.symbol = this.marketDataService.symbols.filter(q => q.matriksCode == "SUSD")[0];
    //     break;
    //   case 'platin':
    //     this.symbol = this.marketDataService.symbols.filter(q => q.matriksCode == "SEURO")[0];
    //     break;
    //   case 'all':
    //     this.symbols = this.marketDataService.symbols;
    //     break;
    //   default:
    //     break;
    // }
    this.getChartData();
  }
  getChartData() {
    this.appService.toggleLoader(true).then((res) => {
      // this.matriksService.getgraphicdata(parseInt(this.selectedTimeRange), this.symbol.matriksCode).subscribe(
      //   (v) => this.onChartData(v),
      //   (e) => this.onError(e)
      // );
    });
  }

  onChartData(v: GraphicDataModel): void {
    this.zone.run(() => {
      this.appService.toggleLoader(false);
      console.log(v)
      const lineData = v?.data?.map(x => ({
        time: (moment(x.date, 'DD.MM.YYYY HH:mm:ss').toDate().getTime() / 1000),
        value: x.close
      })).sort((a, b) => (a.time > b.time ? 1 : -1));
      if (lineData != undefined) {
        this.lineData = lineData;
      }

     
    });
  }

  onError(e: any): void {
    this.zone.run(() => {
      this.appService.toggleLoader(false);
      this.appService.showErrorAlert(e);
    });
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
