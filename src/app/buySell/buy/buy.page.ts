import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.page.html',
  styleUrls: ['./buy.page.scss'],
})
export class BuyPage implements OnInit {
 
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
