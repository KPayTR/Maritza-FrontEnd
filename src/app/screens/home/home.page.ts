import { Component, NgZone } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { UTCTimestamp } from 'lightweight-charts';
import * as moment from 'moment';
import { FinanceApiService, GraphTypeEnum, SymbolDTO, SymbolGraphDTO, SymbolRateDTO } from 'src/app/services/api-hkn-yatirimim.service';
import { AuthApiService, GraphicDataModel, MatriksApiService, SymbolRateModel, SymbolsApiService, SymbolVoteRequestModel, SymbolVoteSummaryModel, TokenModel } from 'src/app/services/api-yatirimim.service';
import { AppService } from 'src/app/services/app.service';
import { MarketDataService } from 'src/app/services/market-data.service';
import { MarketSymbolsService } from 'src/app/services/market-symbols.service';

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
  symbol: SymbolRateDTO;
  symbols: SymbolRateDTO[];
  allSymbols: SymbolDTO[];

  candleData: any[] = []
  lineData: any[] = []
  voteSummary: SymbolVoteSummaryModel;
  constructor(
    private barcodeScanner: BarcodeScanner,
    private marketDataService: MarketDataService,
    private marketSymbolService: MarketSymbolsService,
    private financeData: FinanceApiService,
    private zone: NgZone,
    private router: Router,
    private authService: AuthApiService,
    private appService: AppService,
    private matriksService: MatriksApiService,
    private symbolApiService: SymbolsApiService
  ) {
    if (marketSymbolService.metalSymbols == null) { 
      marketSymbolService.symbolsLoad.subscribe(v => {
        this.loadSegmentData();
      })
    }
    else {
      this.loadSegmentData();
    } 

  }

  getChartData() {
   
    this.appService.toggleLoader(true).then((res) => {
      this.financeData.getSymbolGraph(this.symbol.symbolRID,GraphTypeEnum.Daily).subscribe(
      //this.matriksService.getgraphdata(parseInt(this.selectedTimeRange), this.symbol.matriksCode)
        // this.matriksService.getgraphdata(parseInt(this.selectedTimeRange), "SUSD").subscribe(
        (v) => this.onChartDatads(v),
        (e) => this.onError(e)
      );
    });
  }
  onChartDatads(v: SymbolGraphDTO[]): void {
    console.log(v)
      this.zone.run(() => {
      this.appService.toggleLoader(false);
      const candleData = v.map(x => ({
        time: (moment(x.dateTimeStamp, 'DD.MM.YYYY HH:mm:ss').toDate().getTime() / 1000),
        open: x.opening,
        high: x.high,
        low: x.low,
        close: x.closing
      })).sort((a, b) => (a.time > b.time ? 1 : -1));

      if (candleData != undefined) {
        this.candleData = candleData;
      }

      const lineData = v.map(x => ({
        time: (moment(x.dateTimeStamp, 'DD.MM.YYYY HH:mm:ss').toDate().getTime() / 1000),
        value: x.closing
      })).sort((a, b) => (a.time > b.time ? 1 : -1));
      if (lineData != undefined) {
        this.lineData = lineData;
      }

     });
  }

  onChartData(v: GraphicDataModel): void {
    this.zone.run(() => {
      this.appService.toggleLoader(false);
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
    console.log("loadSegmentData", this.marketSymbolService.metalSymbols)
    if (this.marketSymbolService.metalSymbols == null) return;

    switch (this.selectedSegment) {
      case 'gold':
        this.symbol = this.marketSymbolService.metalSymbols.filter(q => q.symbolRID == 1)[0] 
        break;
      case 'silver':
        this.symbol = this.marketSymbolService.metalSymbols.filter(q => q.symbolRID == 2)[0];
        break;
      case 'palladium':
        this.symbol = this.marketSymbolService.metalSymbols.filter(q => q.symbolRID == 3)[0];
        break;
      case 'platin':
        this.symbol = this.marketSymbolService.metalSymbols.filter(q => q.symbolRID == 4)[0];
        break;
      case 'all':
        this.symbols = this.marketSymbolService.allSymbol;
        this.updateData();
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
    this.selectedValue = e.detail.value;
    this.updateData();
  }

  updateData() {
    if (this.marketSymbolService.metalSymbols == null) return;
    switch (this.selectedValue) {
      case 'maden':
        this.allSymbols = this.marketSymbolService.allSymbol.filter(q => q.symbolType.toString() == "Metal"); 
        this.symbols = this.marketSymbolService.metalSymbols;  
       // console.log("maden2 ", this.marketSymbolService.allSymbol.filter(q => q.rID == this.symbols[0].symbolRID)); 
        break;
      case 'doviz':
        this.symbols = this.marketSymbolService.forexSymbols;
        this.allSymbols = this.marketSymbolService.allSymbol.filter(q => q.symbolType.toString() == "Forex");  
        break;
      case 'sarrafi':
        this.symbols = this.marketSymbolService.sarrafiyeSymbols;
        this.allSymbols = this.marketSymbolService.allSymbol.filter(q => q.symbolType.toString() == "Sarrafiye");  

        break;

      default:
        break;
    }
  }

  checkImage(e) {
    const target = e.target;
    target.classList.add('d-none');
    target.parentElement.getElementsByClassName('currency-symbol')[0].classList.remove('d-none')
  }
  goAlarm(sym){
    console.log(sym)
    let navigationExtras: NavigationExtras = {
      state: {
        symbol: sym
      }
    };
    this.router.navigate(['alarm'], navigationExtras);
  }
  goNotification(){  
    this.router.navigate(['user/notifications']);
  }

  getVoteData() {
    const body = new SymbolVoteRequestModel();
    body.customerId = this.appService.user?.id ?? 1;
    body.symbolId = this.symbol.symbolRID;

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




}
