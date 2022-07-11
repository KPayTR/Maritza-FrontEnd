import { DecimalPipe } from '@angular/common';
import { EventEmitter, Injectable, NgZone, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SymbolModel, SymbolRateModel, SymbolsApiService, SymbolType } from './api-yatirimim.service';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class MarketDataService {

  @Output() symbolsLoad = new EventEmitter();
  @Output() symbolRatesLoad = new EventEmitter();

  public symbolRates: SymbolRateModel[];
  public symbols: SymbolModel[];

  constructor(
    private appService: AppService,
    private router: Router,
    private zone: NgZone,
    private decimalPipe: DecimalPipe,
    private symbolApiService: SymbolsApiService
  ) {
  }

  public init() {
    this.symbolApiService.getsymbollist().subscribe(
      v => this.onSymbolsData(v),
      e => this.onError(e)
    )

    //setInterval(() => { this.loadSymbolRates(), 3000 });
  }

  onSymbolsData(v: SymbolModel[]): void {
    this.zone.run(() => {
      this.symbols = v;
      this.symbolsLoad.emit(v);
    });

    this.loadSymbolRates();
  }

  loadSymbolRates() {
    this.symbolApiService.getsymbolrates().subscribe(
      (v) => this.onSymbolRates(v),
      (e) => this.onError(e)
    );
  }

  onSymbolRates(v: SymbolRateModel[]): void {
    this.zone.run(() => {
      this.symbolRates = v;
      this.symbolRatesLoad.emit(v);
    });
  }

  onError(e: any): void {
    this.zone.run(() => {
      this.appService.showErrorAlert(e);
      console.log("marketdata err", e)
      this.router.navigate(["/auth/login"]);
      this.appService.toggleLoader(false);
    });
  }

  calculate(amount: number, sourceIsoCode: string, targetIsoCode: string, convertType: 'buy' | 'sell', returnType: 'string' | 'number') {
    let sourceValue = amount;
    let targetValue = 0;

    let rateSource = new SymbolRateModel();
    rateSource.buy = 1;
    rateSource.sell = 1;

    let rateTarget = new SymbolRateModel();
    rateTarget.buy = 1;
    rateTarget.sell = 1;

    if (sourceIsoCode != 'TRY') {
      rateSource = this.symbolRates.find(x => x.isoCode == sourceIsoCode);
    }

    if (targetIsoCode != 'TRY') {
      rateTarget = this.symbolRates.find(x => x.isoCode == targetIsoCode);
    }

    if (convertType == 'buy') {
      targetValue = sourceValue * rateSource.buy / rateTarget.buy;
    }
    else {
      targetValue = sourceValue * rateSource.sell / rateTarget.sell;
    }

    if(returnType == 'string') {
      return this.decimalPipe.transform(targetValue, '1.2-2')
    }

    return targetValue;
  }
}
