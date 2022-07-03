import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FinanceApiService, SymbolDTO, SymbolRateDTO } from './api-hkn-yatirimim.service'; 
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class MarketSymbolsService {

   metalSymbols: SymbolRateDTO[];
   sarrafiyeSymbols: SymbolRateDTO[];
   forexSymbols: SymbolRateDTO[];
   allSymbol:SymbolDTO[];
   symbolsLoad = new EventEmitter();
   metalsID:string="";
   forexsID:string="";
   sarrafiyeID:string="";
  constructor( 
    private appService: AppService,
    private router: Router,
    private zone: NgZone,
    private symbolData: FinanceApiService
  ) {
  }

  public init() {
   // this.symbolApiService.getsymbolrates().subscribe(
    this.symbolData.getSymbolList().subscribe(
      (v) => this.onMarketAllData(v),
      (e) => this.onError(e)
    );
  }
  onMarketAllData(v: SymbolDTO[]): void {
    this.zone.run(() => {
      if (v != null && v.length > 0) { 
        this.allSymbol = v;
        let tempMetal=this.allSymbol.filter(q => q.symbolType.toString() == "Metal") 
        tempMetal.forEach(element => {
          this.metalsID= this.metalsID + ','+ element.rID;
        });
        let tempForex=this.allSymbol.filter(q => q.symbolType.toString() == "Forex") 
        tempForex.forEach(element => {
          this.forexsID= this.forexsID+ ','+ element.rID;
        });
        let tempSarrafiye=this.allSymbol.filter(q => q.symbolType.toString() == "Sarrafiye") 
        tempSarrafiye.forEach(element => {  
          this.sarrafiyeID= this.sarrafiyeID+ ','+ element.rID;
        }); 
        this.symbolsLoad.emit(v);
        this.metalSymbols= [];
        this.forexSymbols= [];
        this.sarrafiyeSymbols= [];
        this.getSymbolWithID(this.metalsID,1);
        this.getSymbolWithID(this.forexsID,2);
        this.getSymbolWithID(this.sarrafiyeID,3);
      }
    });
  }
  getSymbolWithID(v,num){
    this.symbolData.getSymbolRates(v.substring(1)).subscribe(
      (v) => this.onMarketData(v,num),
      (e) => this.onError(e)
    );
  }
  onMarketData(v: SymbolRateDTO[],numb): void {
    this.zone.run(() => {
      if (v != null && v.length > 0) {
        if (numb==1) {
          this.metalSymbols= v;
        } else if(numb==2) {
          this.forexSymbols= v;
        }else {
          this.sarrafiyeSymbols= v;
        } 
        console.log("marketdata",this.metalSymbols)
        this.symbolsLoad.emit(v);
      }
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


}
