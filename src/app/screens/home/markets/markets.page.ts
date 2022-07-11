import { Component, OnInit } from '@angular/core';
import { SymbolRateModel, SymbolType } from 'src/app/services/api-yatirimim.service';
import { MarketDataService } from 'src/app/services/market-data.service';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.page.html',
  styleUrls: ['./markets.page.scss'],
})
export class MarketsPage implements OnInit {
  selectedSegment = 'maden';
  boolImg: boolean = false;
  symbols: SymbolRateModel[];

  constructor(
    private marketDataService: MarketDataService
  ) { }

  ngOnInit() {
    this.updateData();
  }

  segmentChanged(e) {
    this.selectedSegment = e.detail.value;
    this.updateData();
  }

  updateData() {
    if (this.marketDataService.symbols == null) return;
    switch (this.selectedSegment) {
      case 'maden':
        this.symbols = this.marketDataService.symbols.filter(q => q.symbolType == SymbolType.Metal)
        break;
      case 'doviz':
        this.symbols = this.marketDataService.symbols.filter(q => q.symbolType == SymbolType.Forex);
        console.log("doviz" + this.symbols)
        break;
      case 'sarrafiye':
        this.symbols = this.marketDataService.symbols.filter(q => q.symbolType == SymbolType.Sarrafiye);
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
}
