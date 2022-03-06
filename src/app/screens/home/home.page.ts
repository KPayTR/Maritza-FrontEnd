import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class Home {

  selectedSegment = 'gold'
  selectedChartType = 'candle';
  selectedTimeRange = '5';

  data = {

  }

  constructor() { }

  ionViewDidEnter() {
    
  }

  segmentChanged(e) {
    this.selectedSegment = e.detail.value;
  }

  chartTypeChange(e) {
    this.selectedChartType = e.detail.value;
  }

  timeRangeChange(e) {
    this.selectedTimeRange = e.detail.value;
  }
}
