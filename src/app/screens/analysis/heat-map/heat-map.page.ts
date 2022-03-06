import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.page.html',
  styleUrls: ['./heat-map.page.scss'],
})
export class HeatMapPage implements OnInit {

  data = [
    {
      id: 1,
      symbol: 'XAUUSD',
      price: 1803.66,
      diffValue: -1.93,
      diffPercent: -0.11,
      class: ''
    },
    {
      id: 2,
      symbol: 'XAGUSD',
      price: 23.125,
      diffValue: 0.113,
      diffPercent: 0.49,
      class: ''
    },
    {
      id: 3,
      symbol: 'BRENT',
      price: 78.680,
      diffValue: -0.004,
      diffPercent: -0.001,
      class: ''
    },
    {
      id: 4,
      symbol: 'TAHVIL',
      price: 23.31,
      diffValue: 0.30,
      diffPercent: 1.30,
      class: ''
    },
  ]

  selectedSegment: string = 'all';

  constructor() {
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

    for (let i = 0; i < this.data.length; i++) {
      const element = this.data[i];
      
      if(element.diffPercent < -0.5) {
        element.class = 'danger-3'
      }
      else if(element.diffPercent < -0.3) {
        element.class = 'danger-2'
      }
      else if(element.diffPercent < 0) {
        element.class = 'danger-1'
      }
      else if(element.diffPercent < 0.3) {
        element.class = 'success-1'
      }
      else if(element.diffPercent < 0.5) {
        element.class = 'success-2'
      }
      else if(element.diffPercent > 0.5) {
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
