import { Component, OnInit } from '@angular/core';
import { MarketDataService } from 'src/app/services/market-data.service';

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.page.html',
  styleUrls: ['./heat-map.page.scss'],
})
export class HeatMapPage implements OnInit {

  data = []

  selectedSegment: string = 'all';

  constructor(private marketService: MarketDataService) {
    
    this.data = marketService.symbols.map(x => {
      const itemRate = marketService.symbolRates.find(y => x.id == y.symbolId)
      if(itemRate == undefined) return null;

      const item = {
        id: x.isoCode,
        symbol: x.name,
        price: itemRate.sell,
        diffValue: itemRate.difference,
        diffPercent: itemRate.dailyChangePercent,
        class: ''
      };

      return item;
    }).filter(x => x != null);

    /*
    const symbols = ['ITTFH', 'BERA', 'ADESE', 'GARAN', 'SRVGY', 'RGHEAG', 'XAGTRY', 'XAGGR', 'KLNMA', 'FORMT', 'VKGYO', 'CEMAS']
    for (let i = 0; i < symbols.length; i++) {
      const element = symbols[i];
      const item = {
        id: 5 + i,
        symbol: element,
        price: 23.31 * Math.random(),
        diffValue: -5 + Math.random() * 10,
        diffPercent: 0,
        class: ''
      }
      item.diffPercent = item.diffValue / item.price;
      this.data.push(item);
    }
    */

    for (let i = 0; i < this.data.length; i++) {
      const element = this.data[i];

      if (element.diffPercent < -0.5) {
        element.class = 'danger-3'
      }
      else if (element.diffPercent < -0.3) {
        element.class = 'danger-2'
      }
      else if (element.diffPercent < 0) {
        element.class = 'danger-1'
      }
      else if (element.diffPercent < 0.3) {
        element.class = 'success-1'
      }
      else if (element.diffPercent < 0.5) {
        element.class = 'success-2'
      }
      else if (element.diffPercent > 0.5) {
        element.class = 'success-3'
      }

    }
  }

  ngOnInit() {
  }

  onSegmentChange(e) {
    this.selectedSegment = e.detail.value;
  }
}
