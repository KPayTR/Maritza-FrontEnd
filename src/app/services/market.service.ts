import { Injectable, NgZone } from '@angular/core';
import { MarketModel, MatriksApiService, SymbolModel, SymbolRateModel, SymbolsApiService } from './api-yatirimim.service';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class CoreService { 
  symbols: SymbolRateModel[];
  constructor(
    private symbolApiService: SymbolsApiService,
    private appService: AppService,
    private zone: NgZone,
  ) { 
   }
   public init() {
   // setTimeout(() => this.init(), 5000);
    this.symbolApiService.getrates().subscribe(
      (v) => this.onMarkets(v),
      (e) => this.onError(e)
    ); 
  } 
  onMarkets(v: SymbolRateModel[]): void {
    this.zone.run(() => { 
      this.symbols=v;
      console.log(this.symbols);  

    });
  }
 
  onError(e: any): void {
    this.zone.run(() => {
      this.appService.toggleLoader(false);
      this.appService.showErrorAlert(e);
    });
  }
  
 
}
