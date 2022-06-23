import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { FinanceApiService, SymbolRateDTO } from './api-hkn-yatirimim.service'; 
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class MarketSymbolsService {

   symbols: SymbolRateDTO[];

  symbolsLoad = new EventEmitter();

  constructor( 
    private appService: AppService,
    private zone: NgZone,
    private symbolData: FinanceApiService
  ) {
  }

  public init() {
   // this.symbolApiService.getsymbolrates().subscribe(

    this.symbolData.getSymbolRates("1,2,3,4,5,6,7,8").subscribe(
      (v) => this.onMarketData(v),
      (e) => this.onError(e)
    );
  }
  onMarketData(v: SymbolRateDTO[]): void {
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
      this.appService.toggleLoader(false);
      this.appService.showErrorAlert(e);
    });
  }


}
