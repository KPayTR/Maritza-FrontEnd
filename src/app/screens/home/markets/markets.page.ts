import { Component, OnInit } from '@angular/core';
import { SymbolRateModel } from 'src/app/services/api-yatirimim.service';
import { CoreService } from 'src/app/services/market.service';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.page.html',
  styleUrls: ['./markets.page.scss'],
})
export class MarketsPage implements OnInit {
  selectedSegment = 'maden';

  constructor(
    private coreService: CoreService

  ) { }
  symbols: SymbolRateModel[];

  ngOnInit() {
    this.symbols=this.coreService.symbols.filter(q => q.matriksCode=="SGLD" || q.matriksCode=="SXAGGR" )

  }
  segmentChanged(e) {
    this.selectedSegment = e.detail.value;
    switch (this.selectedSegment) {
      case 'maden':
         this.symbols=this.coreService.symbols.filter(q => q.matriksCode=="SGLD" || q.matriksCode=="SXAGGR" )
        break;
      case 'doviz':
        this.symbols=this.coreService.symbols.filter(q => q.matriksCode=="SUSD" || q.matriksCode=="SEURO" || q.matriksCode=="SGBP" || q.matriksCode=="SCHF" || q.matriksCode=="SJPY" || q.matriksCode=="SSAR"); 
        break;
      case 'sarrafi':
        this.symbols=this.coreService.symbols.filter(q => q.matriksCode=="SGLD");
        break;
 
      default:
        break;
    }
  }
}
