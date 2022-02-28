import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
})
export class SellPage implements OnInit {
  currency1: string = "TL";
  currency2: string = "ALTIN";
  constructor() { }

  ngOnInit() {
  }
  changeCurrency() {
    let temp = this.currency1;
    this.currency1 = this.currency2;
    this.currency2 = temp;
  }

  segmentChanged(e) {
    
  }
}
