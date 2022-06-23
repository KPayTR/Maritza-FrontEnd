import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { MarketModel, MatriksApiService, SymbolModel,  SymbolRateModel,  SymbolsApiService } from './api-yatirimim.service';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class MarketDataService {

   symbols: SymbolRateModel[];

  symbolsLoad = new EventEmitter();

  constructor(
    private symbolApiService: SymbolsApiService,
    private appService: AppService,
    private zone: NgZone,
  ) {
  }

  public init() {
    setInterval(()=>{
      this.symbolApiService.getsymbolrates().subscribe(
        (v) => this.onMarkets(v),
        (e) => this.onError(e)
      );
    }, 3000)
  }

  onMarkets(v: SymbolRateModel[]): void {
    this.zone.run(() => {
      if (v != null && v.length > 0) {
        console.log("marketdata",v)
        this.symbols = v;
        this.symbolsLoad.emit(v);
      }
    });
  }

  onError(e: any): void {
    this.zone.run(() => {
      this.appService.showErrorAlert(e);
    });
  }


}
