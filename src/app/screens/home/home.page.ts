import { Component, NgZone } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { UTCTimestamp } from 'lightweight-charts';
import * as moment from 'moment';
import { AuthApiService, GraphicDataModel, MatriksApiService, MatriksGraphType, SymbolModel, SymbolRateModel, SymbolsApiService, SymbolType, SymbolVoteRequestModel, SymbolVoteSummaryModel, TokenModel } from 'src/app/services/api-yatirimim.service';
import { AppService } from 'src/app/services/app.service';
import { MarketDataService } from 'src/app/services/market-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class Home {
  barcodeResult: string;
  selectedSymbolType = SymbolType.Metal;
  selectedSegment = 'gold';
  selectedChartType = 'candle';
  selectedTimeRange = MatriksGraphType.Daily;
  currentSymbolRate: SymbolRateModel;
  symbolRates: SymbolRateModel[];
  allSymbols: SymbolModel[];

  candleData: any[] = []
  lineData: any[] = []
  linesData: any = {}
  voteSummary: SymbolVoteSummaryModel;

  constructor(
    public appService: AppService,
    private barcodeScanner: BarcodeScanner,
    private marketDataService: MarketDataService,
    private marketSymbolService: MarketDataService,
    private zone: NgZone,
    private router: Router,
    private authService: AuthApiService,
    private matriksService: MatriksApiService,
    private symbolApiService: SymbolsApiService
  ) {
    if (marketSymbolService.symbolRates == null) {
      marketSymbolService.symbolRatesLoad.subscribe(v => {
        this.loadSegmentData();
      })
    }
    else {
      this.loadSegmentData();
    }

  }

  getChartData() {
    if (this.currentSymbolRate == null) return;

    this.appService.toggleLoader(true).then((res) => {
      this.matriksService.getgraphdata(MatriksGraphType[this.selectedTimeRange], this.currentSymbolRate.matriksCode).subscribe(
        (v) => this.onChartData(v),
        (e) => this.onError(e)
      );
    });
  }

  loadLinesData() {
    for (const symbol of this.marketDataService.symbols) {
      if (this.linesData[symbol.matriksCode] != null) continue;

      this.matriksService.getgraphdata(MatriksGraphType.Daily, symbol.symbolType == SymbolType.Sarrafiye ? 'GLDGR' : symbol.matriksCode).subscribe(
        (v) => {
          this.linesData[symbol.matriksCode] = v.data.map(x => ({
            time: (moment(x.date, 'DD.MM.YYYY HH:mm:ss').toDate().getTime() / 1000),
            value: x.close
          })).sort((a, b) => (a.time > b.time ? 1 : -1));
        },
        (e) => console.log(e)
      );
    }
  }

  onChartData(v: GraphicDataModel): void {
    console.log(v)
    this.zone.run(() => {
      this.appService.toggleLoader(false);
      const candleData = v.data.map(x => ({
        time: (moment(x.date, 'DD.MM.YYYY HH:mm:ss').toDate().getTime() / 1000),
        open: x.open,
        high: x.high,
        low: x.low,
        close: x.close
      })).sort((a, b) => (a.time > b.time ? 1 : -1));

      if (candleData != undefined) {
        this.candleData = candleData;
      }

      const lineData = v.data.map(x => ({
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

  segmentChanged(e) {
    this.selectedSegment = e.detail.value;
    this.loadSegmentData();
  }

  loadSegmentData() {
    if (this.marketSymbolService.symbolRates == null) return;

    switch (this.selectedSegment) {
      case 'gold':
        this.currentSymbolRate = this.marketSymbolService.symbolRates.filter(q => q.symbolId == 1)[0]
        break;
      case 'silver':
        this.currentSymbolRate = this.marketSymbolService.symbolRates.filter(q => q.symbolId == 2)[0];
        break;
      case 'palladium':
        this.currentSymbolRate = this.marketSymbolService.symbolRates.filter(q => q.symbolId == 3)[0];
        break;
      case 'platin':
        this.currentSymbolRate = this.marketSymbolService.symbolRates.filter(q => q.symbolId == 4)[0];
        break;
      case 'all':
        this.symbolRates = this.marketSymbolService.symbolRates;
        this.updateData();
        this.loadLinesData();
        break;
      default:
        break;
    }
    this.getChartData();
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
    this.selectedSymbolType = e.detail.value;
    this.updateData();
  }

  updateData() {
    if (this.marketSymbolService.symbolRates == null) return;
    this.allSymbols = this.marketSymbolService.symbols.filter(q => q.symbolType == this.selectedSymbolType && q.id != 5);

  }

  getSymbolRate(symbol: SymbolModel) {
    return this.marketDataService.symbolRates.find(x => x.symbolId == symbol.id);
  }

  checkImage(e) {
    const target = e.target;
    target.classList.add('d-none');
    target.parentElement.getElementsByClassName('currency-symbol')[0].classList.remove('d-none')
  }

  goAlarm(symbolId: number) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        symbol: symbolId
      }
    };
    this.router.navigate(['alarm'], navigationExtras);
  }

  goNotification() {
    this.router.navigate(['user/notifications']);
  }

  getVoteData() {
    const body = new SymbolVoteRequestModel();
    body.userId = this.appService.user?.id ?? 1;
    body.symbolId = this.currentSymbolRate.symbolId;

    this.symbolApiService.getsymbolvotesummary(body)
      .subscribe(
        v => {
          this.voteSummary = v;
        },
        e => this.onError(e)
      )
  }

  getVotePercent(type: 'increasing' | 'decreasing') {
    if (this.voteSummary && (this.voteSummary.increasingCount > 0 || this.voteSummary.decreasingCount > 0)) {
      if (type == 'increasing') {
        if (this.voteSummary.decreasingCount == 0 && this.voteSummary.increasingCount == 0) return 50;
        if (this.voteSummary.decreasingCount == 0 && this.voteSummary.increasingCount > 0) return 100;
        if (this.voteSummary.increasingCount == 0 && this.voteSummary.decreasingCount > 0) return 0;

        return (this.voteSummary.increasingCount * 100 / (this.voteSummary.decreasingCount + this.voteSummary.increasingCount))
      }
      else if (type == 'decreasing') {
        if (this.voteSummary.decreasingCount == 0 && this.voteSummary.increasingCount == 0) return 50;
        if (this.voteSummary.increasingCount == 0 && this.voteSummary.decreasingCount > 0) return 100;
        if (this.voteSummary.decreasingCount == 0 && this.voteSummary.increasingCount > 0) return 0;

        return (this.voteSummary.decreasingCount * 100 / (this.voteSummary.decreasingCount + this.voteSummary.increasingCount))
      }
    }
    return 50;
  }




}
