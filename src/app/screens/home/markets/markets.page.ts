import { Component, OnInit } from '@angular/core';
import { SymbolRateModel } from 'src/app/services/api-yatirimim.service';
import { MarketDataService } from 'src/app/services/market-data.service';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.page.html',
  styleUrls: ['./markets.page.scss'],
})
export class MarketsPage implements OnInit {
  selectedSegment = 'maden';

  constructor(
    private coreService: MarketDataService

  ) { }
  symbols: SymbolRateModel[];

  ngOnInit() {
    this.updateData();
  }

  segmentChanged(e) {
    this.selectedSegment = e.detail.value;
    this.updateData();
  }

  updateData() {
    switch (this.selectedSegment) {
      case 'maden':
        this.symbols = this.coreService.symbols.filter(q => q.symbolType.code == "METALS")
        break;
      case 'doviz':
        this.symbols = this.coreService.symbols.filter(q => q.symbolType.code == "FOREX");
        break;
      case 'sarrafi':
        this.symbols = this.coreService.symbols.filter(q => q.matriksCode == "SGLD");
        break;

      default:
        break;
    }
  }
}
