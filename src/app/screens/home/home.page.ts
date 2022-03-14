import { Component, NgZone } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { UTCTimestamp } from 'lightweight-charts';
import * as moment from 'moment';
import { GraphicDataModel, MatriksApiService, SymbolRateModel } from 'src/app/services/api-yatirimim.service';
import { AppService } from 'src/app/services/app.service';
import { MarketDataService } from 'src/app/services/market-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class Home {
  barcodeResult: string;

  selectedSegment = 'gold';
  selectedChartType = 'candle';
  selectedTimeRange = '15';
  symbol: SymbolRateModel;
  symbols: SymbolRateModel[];

  candleData: any[] = []
  lineData: any[] = []

  constructor(
    private barcodeScanner: BarcodeScanner,
    private marketDataService: MarketDataService,
    private zone: NgZone,
    private appService: AppService,
    private matriksService: MatriksApiService,
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
    this.appService.toggleLoader(true).then((res) => {
      this.matriksService.getgraphicdata(parseInt(this.selectedTimeRange), this.symbol.matriksCode).subscribe(
        (v) => this.onChartData(v),
        (e) => this.onError(e)
      );
    });
  }

  onChartData(v: GraphicDataModel): void {
    this.zone.run(() => {
      this.appService.toggleLoader(false);
      console.log(v)
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

  segmentChanged(e) {
    this.selectedSegment = e.detail.value;
    this.loadSegmentData();
  }

  loadSegmentData() {
    if (this.marketDataService.symbols == null) return;

    switch (this.selectedSegment) {
      case 'gold':
        this.symbol = this.marketDataService.symbols.filter(q => q.matriksCode == "SGLD")[0]
        break;
      case 'silver':
        this.symbol = this.marketDataService.symbols.filter(q => q.matriksCode == "SXAGGR")[0];
        break;
      case 'palladium':
        this.symbol = this.marketDataService.symbols.filter(q => q.matriksCode == "SUSD")[0];
        break;
      case 'platin':
        this.symbol = this.marketDataService.symbols.filter(q => q.matriksCode == "SEURO")[0];
        break;
      case 'all':
        this.symbols = this.marketDataService.symbols;
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
    console.log(value, this.selectedTimeRange);
    
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
        console.log('Barcode data', barcodeData);
        if (barcodeData == undefined || barcodeData.text.length == 0) {
          //this.appService.showAlert("İşlemi İptal Ettiniz.");
          console.log('Barcode data', barcodeData);
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
}
