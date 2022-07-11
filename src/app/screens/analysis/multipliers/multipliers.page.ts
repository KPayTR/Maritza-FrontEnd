import { Component, OnInit } from '@angular/core';
import { MarketDataService } from 'src/app/services/market-data.service';

@Component({
  selector: 'app-multipliers',
  templateUrl: './multipliers.page.html',
  styleUrls: ['./multipliers.page.scss'],
})
export class MultipliersPage implements OnInit {

  selectedValue: string = 'XPT/XAG';
  result: number;

  constructor(
    private marketDataService: MarketDataService
  ) { }

  ngOnInit() {
    this.calculate();
  }

  calculate() {
    const sourceIsoCode = this.selectedValue.split('/')[0];
    const targetIsoCode = this.selectedValue.split('/')[1];

    this.result = this.marketDataService.calculate(1, sourceIsoCode, targetIsoCode, 'buy', 'number') as number;
    console.log(this.result)
  }

}
