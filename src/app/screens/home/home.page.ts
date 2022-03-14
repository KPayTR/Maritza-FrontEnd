import { Component, NgZone } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { GraphicDataModel, MatriksApiService, SymbolRateModel } from 'src/app/services/api-yatirimim.service';
import { AppService } from 'src/app/services/app.service';
import { CoreService } from 'src/app/services/market.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class Home {
  barcodeResult: string;

  selectedSegment = 'gold';
  selectedChartType = 'candle';
  selectedTimeRange = '5';
  symbol: SymbolRateModel;
  symbols: SymbolRateModel[];
  graphData: GraphicDataModel;
  data = {};

  constructor(
    private barcodeScanner: BarcodeScanner,
    private coreService: CoreService,
    private zone: NgZone,
    private appService : AppService,
    private matriksService: MatriksApiService,
  ) { 
    this.getChartData();
    this.symbol=this.coreService.symbols.filter(q => q.matriksCode=="SGLD")[0]
 
  }

  getChartData() {
    this.appService.toggleLoader(true).then((res) => {
      this.matriksService.getgraphicdata(15,"SGLD").subscribe(
        (v) => this.onData(v),
        (e) => this.onError(e)
      );
    });
  }
  onData(v: GraphicDataModel): void {
    this.zone.run(() => {
      this.appService.toggleLoader(false);
      console.log(v);
      this.graphData = v;
      console.log(this.graphData);
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
    switch (this.selectedSegment) {
      case 'gold':
         this.symbol=this.coreService.symbols.filter(q => q.matriksCode=="SGLD")[0]
     
        break;
      case 'silver':
        this.symbol=this.coreService.symbols.filter(q => q.matriksCode=="SXAGGR")[0];
        break;
      case 'palladium':
        this.symbol=this.coreService.symbols.filter(q => q.matriksCode=="SUSD")[0];
        break;
      case 'platin':
        this.symbol=this.coreService.symbols.filter(q => q.matriksCode=="SEURO")[0];
        break;
      case 'all':
        this.symbols=this.coreService.symbols;
        break; 
      default:
        break;
    }
  }

  chartTypeChange(e) {
    this.selectedChartType = e.detail.value;
  }

  timeRangeChange(e) {
    this.selectedTimeRange = e.detail.value;
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
