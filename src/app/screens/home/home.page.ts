import { Component, NgZone } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { UTCTimestamp } from 'lightweight-charts';
import * as moment from 'moment';
import { AuthApiService, GraphicDataModel, MatriksApiService, SymbolRateModel, SymbolsApiService, SymbolVoteRequestModel, TokenModel } from 'src/app/services/api-yatirimim.service';
import { AppService } from 'src/app/services/app.service';
import { MarketDataService } from 'src/app/services/market-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class Home {
  barcodeResult: string;
  selectedValue = 'maden';
  selectedSegment = 'gold';
  selectedChartType = 'candle';
  selectedTimeRange = '5';
  symbol: SymbolRateModel;
  symbols: SymbolRateModel[];

  candleData: any[] = []
  lineData: any[] = []
  lineDatas: any = {};
  voteSummary: import("/Users/Kocaman/Works/Maritza/Mobile/src/app/services/api-yatirimim.service").SymbolVoteSummaryModel;

  constructor(
    public appService: AppService,
    private barcodeScanner: BarcodeScanner,
    private marketDataService: MarketDataService,
    private zone: NgZone,
    private authService: AuthApiService,
    private matriksService: MatriksApiService,
    private symbolApiService: SymbolsApiService
  ) {
    if (marketDataService.symbols == null) {
      marketDataService.symbolsLoad.subscribe(v => {
        this.loadSegmentData();
      })
    }
    else {
      this.loadSegmentData();
    }

  }

  getChartData() {
    this.matriksService.getgraphdata(parseInt(this.selectedTimeRange), this.symbol.matriksCode).subscribe(
      (v) => this.onChartData(v),
      (e) => this.onError(e)
    );
  }

  onChartData(v: GraphicDataModel): void {
    this.zone.run(() => {
      const candleData = v?.data?.map(x => ({
        time: (moment(x.date, 'DD.MM.YYYY HH:mm:ss').toDate().getTime() / 1000),
        open: x.open,
        high: x.high,
        low: x.low,
        close: x.close
      })).sort((a, b) => (a.time > b.time ? 1 : -1));

      if (candleData != undefined) {
        this.candleData = candleData;
      }

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


  getAssetChartsData() {
    for (const symbol of this.symbols) {
      if(this.lineDatas[symbol.matriksCode]) continue;
      
      this.matriksService.getgraphdata(5, symbol.matriksCode).subscribe(
        (v) => {
          this.zone.run(() => {
            const lineData = v?.data?.map(x => ({
              time: (moment(x.date, 'DD.MM.YYYY HH:mm:ss').toDate().getTime() / 1000),
              value: x.close
            })).sort((a, b) => (a.time > b.time ? 1 : -1));
            this.lineDatas[symbol.matriksCode] = lineData;
          });
        },
        (e) => this.onError(e)
      );
    }

  }

  getVoteData() {
    const body = new SymbolVoteRequestModel();
    body.customerId = this.appService.user?.id ?? 1;
    body.symbolId = this.symbol.symbolId;

    this.symbolApiService.getsymbolvotesummary(body)
      .subscribe(
        v => {
          this.voteSummary = v;
        },
        e => this.onError(e)
      )
  }

  getVotePercent(type: 'increasing' | 'decreasing') {
    if(this.voteSummary && (this.voteSummary.increasingCount > 0 || this.voteSummary.decreasingCount > 0)) {
      if(type == 'increasing') {
        if(this.voteSummary.decreasingCount == 0 && this.voteSummary.increasingCount == 0) return 50;
        if(this.voteSummary.decreasingCount == 0 && this.voteSummary.increasingCount > 0) return 100;
        if(this.voteSummary.increasingCount == 0 && this.voteSummary.decreasingCount > 0) return 0;

        return (this.voteSummary.increasingCount * 100 / (this.voteSummary.decreasingCount+this.voteSummary.increasingCount))
      }
      else if(type == 'decreasing') {
        if(this.voteSummary.decreasingCount == 0 && this.voteSummary.increasingCount == 0) return 50;
        if(this.voteSummary.increasingCount == 0 && this.voteSummary.decreasingCount > 0) return 100;
        if(this.voteSummary.decreasingCount == 0 && this.voteSummary.increasingCount > 0) return 0;

        return (this.voteSummary.decreasingCount * 100 / (this.voteSummary.decreasingCount+this.voteSummary.increasingCount))
      }
    }
    return 50;
  }

  segmentChanged(e) {
    this.selectedSegment = e.detail.value;
    this.loadSegmentData();
  }

  loadSegmentData() {
    if (this.marketDataService.symbols == null) return;

    switch (this.selectedSegment) {
      case 'gold':
        this.symbol = this.marketDataService.symbols.filter(q => q.isoCode == "XAU")[0]
        break;
      case 'silver':
        this.symbol = this.marketDataService.symbols.filter(q => q.isoCode == "XAG")[0];
        break;
      case 'palladium':
        this.symbol = this.marketDataService.symbols.filter(q => q.isoCode == "XPD")[0];
        break;
      case 'platin':
        this.symbol = this.marketDataService.symbols.filter(q => q.isoCode == "XPT")[0];
        break;
      case 'all':
        this.symbols = this.marketDataService.symbols;
        this.updateData();
        break;
      default:
        break;
    }
    this.getChartData();
    this.getVoteData();
  }

  chartTypeChange(e) {
    if (this.selectedChartType != e.detail.value) {
      this.selectedChartType = e.detail.value;
    }
  }

  timeRangeChange(e) {
    const value = e.detail.value.toString();

    if (this.selectedTimeRange != value) {
      this.selectedTimeRange = value;
      this.getChartData();
    }
  }

  start() {
    this.barcodeScanner
      .scan({
        orientation: 'portrait',
        formats: 'QR_CODE',
        resultDisplayDuration: 0,
      })
      .then((barcodeData) => {
        if (barcodeData == undefined || barcodeData.text.length == 0) {
          //this.appService.showAlert("İşlemi İptal Ettiniz.");
        } else {
          this.barcodeResult = barcodeData.text.trim();
          // this.appService.showErrorAlert(
          //   "initMetropolQR " + this.barcodeResult
          // );
          //  this.checkout(this.barcodeResult);
        }
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }
  allSegmentChanged(e) {
    this.selectedValue = e.detail.value;
    this.updateData();
  }

  updateData() {
    if (this.marketDataService.symbols == null) return;
    switch (this.selectedValue) {
      case 'maden':
        this.symbols = this.marketDataService.symbols.filter(q => q.symbolType.code == "METALS")
        break;
      case 'doviz':
        this.symbols = this.marketDataService.symbols.filter(q => q.symbolType.code == "FOREX");
        break;
      case 'sarrafi':
        this.symbols = this.marketDataService.symbols.filter(q => q.matriksCode == "SARRAFI");
        break;

      default:
        break;
    }

    this.getAssetChartsData();
  }

  checkImage(e) {
    const target = e.target;
    target.classList.add('d-none');
    target.parentElement.getElementsByClassName('currency-symbol')[0].classList.remove('d-none')
  }

  checkTradeDifference(isoCode: string): number {
    return this.marketDataService.symbols.find(q => q.isoCode == isoCode)?.difference;
  }
}
