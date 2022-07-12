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
  ApexFill,
  ApexLegend,
  ApexTooltip
} from "ng-apexcharts";
import { AssetModel, AssetsApiService, GraphicDataModel, MatriksApiService, MatriksGraphType, } from 'src/app/services/api-yatirimim.service';
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
  lineData: any[] = [];
  lineDatas: any = {};
  candleData: any[] = []
  selectedTimeRange = '1';
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  legend: ApexLegend = { show: false };
  tooltip: ApexTooltip = { enabled: false };

  series: any = [1];
  colors: any = ['#B1B1C5'];
  selectedItem: AssetModel;
  assets: AssetModel[] = [];

  totalPrice: number = 0;

  constructor(
    private zone: NgZone,
    private appService: AppService,
    private marketDataService: MarketDataService,
    private matriksService: MatriksApiService,
    private assetsApiService: AssetsApiService,
    private router: Router
  ) {
    this.chartOptions = {
      chart: {
        type: "donut",
        fontFamily: 'var(--ion-font-family)',
        events: {
          animationEnd: (ctx) => {
            if (this.assets && this.assets.length > 0) {
              const tryIndex = this.assets.findIndex(x => x.symbol.isoCode == 'TRY') ?? 0;
              ctx.toggleDataPointSelection(tryIndex);
              (document.querySelector('path[selected="true"]') as HTMLElement).style.filter = 'none';
            }
          },
          dataPointSelection: (event, chartContext, config) => {
            if (this.assets.length == 0) {
              event.preventDefault();
              return false;
            }
            this.selectedItem = this.assets[config.dataPointIndex];
            (document.querySelector('path[selected="true"]') as HTMLElement).style.filter = 'none';
          },
        },
        selection: {
          enabled: false,
          stroke: {
            width: 0
          }
        },
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
      this.assetsApiService.getwallet()
        .subscribe(
          v => this.initData(v),
          e => {
            this.appService.toggleLoader(false)
            this.appService.showToast('Veri yüklenemedi.', 'bottom')
          }
        )
    });
    if (this.marketDataService.symbols == null) {
      this.marketDataService.symbolsLoad.subscribe(v => {
        this.loadSegmentData();
      })
    }
    else {
      this.loadSegmentData();
    }
  }
  loadSegmentData() {
    if (this.marketDataService.symbols == null) return;
    this.getChartData();
  }

  initData(v: AssetModel[]): void {
    this.appService.toggleLoader(false)
    this.assets = v;
    this.series = this.assets.map(x => x.price);

    if (this.assets.length > 0) {
      this.colors = [];
      for (let i = 0; i < this.assets.length; i++) {
        const asset = this.assets[i];
        if (asset.symbol.isoCode == 'XAU') this.colors.push('#BF8E31')
        else if (asset.symbol.isoCode == 'XAG') this.colors.push('#818C95')
        else if (asset.symbol.isoCode == 'XPD') this.colors.push('#9C9C9C')
        else if (asset.symbol.isoCode == 'XPT') this.colors.push('#535353')
        else if (asset.symbol.isoCode == 'TRY') this.colors.push('#269194')
      }

      this.totalPrice = this.assets.reduce((sum, current) => sum + current.price, 0);

      this.getAssetChartsData();
    }
  }

  getAssetChartsData() {
    for (const asset of this.assets) {
      this.matriksService.getgraphdata(MatriksGraphType.Min5, asset.symbol.matriksCode).subscribe(
        (v) => {
          this.zone.run(() => {
            const lineData = v?.data?.map(x => ({
              time: (moment(x.date, 'DD.MM.YYYY HH:mm:ss').toDate().getTime() / 1000),
              value: x.close
            })).sort((a, b) => (a.time > b.time ? 1 : -1));
            this.lineDatas[asset.symbol.matriksCode] = lineData;
          });
        },
        (e) => this.onError(e)
      );
    }

  }

  getChartData() {
    this.matriksService.getgraphdata(MatriksGraphType[this.selectedTimeRange], "SUSD").subscribe(
      (v) => this.onChartData(v),
      (e) => console.log(e)
    );
  }

  onChartData(v: GraphicDataModel): void {
    this.zone.run(() => {
      this.appService.toggleLoader(false);
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
    //this.series = this.assets.map(x => x.amountTRY);
  }

  segmentChange(e) {
    this.selectedSegmentVal = e.detail.value;
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
  checkTradeValue(value, trade) {
    // Buy: True -- Sell : False
    const symbol = this.marketDataService.symbols.find(q => q.isoCode == value);
    if (trade == true) {
      return (this.marketDataService.symbolRates.find(q => q.symbolId == symbol.id)?.buy);
    } else {
      return (this.marketDataService.symbolRates.find(q => q.symbolId == symbol.id)?.sell);
    }
  }

  checkTradeDifference(isoCode: string): number {
    const symbol = this.marketDataService.symbols.find(q => q.isoCode == isoCode);
    return this.marketDataService.symbolRates.find(q => q.symbolId == symbol.id)?.difference;
  }
}
