import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
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
import { AssetModel, AssetsApiService, GraphicDataModel, MatriksApiService, } from 'src/app/services/api-yatirimim.service';
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
export class Wallet implements OnInit {
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
  assetsx: any = [
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
  series: any = [1];
  colors: any = ['#B1B1C5'];
  selectedItem: any;
  assets: AssetModel[] = [];

  constructor(
    private marketDataService: MarketDataService,
    private zone: NgZone,
    private appService: AppService,
    private matriksService: MatriksApiService,
    private assetsApiService: AssetsApiService,
    private router: Router
  ) {
    this.chartOptions = {
      chart: {
        type: "donut",
        events: {
          dataPointSelection: (event, chartContext, config) => {
            if (this.assets.length == 0) {
              event.preventDefault();
              return false;
            }
            this.selectedItem = this.assets[config.dataPointIndex];
          }
        },
        selection: {
          enabled: false
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
        type: "linear"
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
            },
          }
        }
      },
    };
  }

  ngOnInit(): void {
    this.appService.toggleLoader(true).then(() => {
      this.assetsApiService.getwallet(this.appService.user?.id)
        .subscribe(
          v => this.initData(v),
          e => {
            this.appService.toggleLoader(false)
            this.appService.showToast('Veri yüklenemedi.', 'bottom')
          }
        )
    });
  }

  initData(v: AssetModel[]): void {
    this.appService.toggleLoader(false)
    this.assets = v;
  }

  loadSegmentData() {
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
    //this.colors= this.assets.map(x => x.color);
    //this.series = this.assets.map(x => x.amountTRY);;
  }

  segmentChange(e) {
    this.selectedSegment = e.detail.value;
  }

  goBuy() {
    this.router.navigate(['app/trade/buy'])
  }
  goSell() {
    this.router.navigate(['app/trade/sell'])
  }
  goDeposit() {
    this.router.navigate(['app/transfer/deposit-credit-card'])
  }
  goWithdraw() {
    this.router.navigate(['app/transfer/withdraw-account'])
  }
}
