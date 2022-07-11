import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SymbolModel, SymbolRateModel, SymbolType } from 'src/app/services/api-yatirimim.service';
import { MarketDataService } from 'src/app/services/market-data.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {
  convertType: 'buy' | 'sell' = 'buy';
  sourceValue: number = 0;
  targetValue: string = '0';
  symbols: SymbolModel[];

  sourceSymbolCode: string = 'USD';
  targetSymbolCode: string = 'TRY';

  constructor(
    private decimalPipe: DecimalPipe,
    private marketDataService: MarketDataService
  ) { }

  ngOnInit() {
    const symbolIdsHasRate = this.marketDataService.symbolRates.map(x => x.symbolId);
    this.symbols = this.marketDataService.symbols
      .filter(x => x.symbolType == SymbolType.Forex && (symbolIdsHasRate.indexOf(x.id) > -1 || x.id == 5));
  }

  calc() {
    this.targetValue = this.marketDataService.calculate(this.sourceValue, this.sourceSymbolCode, this.targetSymbolCode, this.convertType, 'string') as string;
  }

  onInputFocus() {
    if (this.sourceValue == 0) {
      this.sourceValue = null;
    }
  }

  onInputBlur() {
    if (this.sourceValue == null) {
      this.sourceValue = 0;
    }
  }
}
