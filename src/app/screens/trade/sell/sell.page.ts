import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
})
export class SellPage implements OnInit {
  price=0;
  constructor() { }

  ngOnInit() {
  this.price=0;

  }
  changeCurrency(e){
    if (e=="25") {
      this.price=12450*0.25
    }
    else if (e=="50"){
      this.price=12450*0.5
    }
    else if (e=="75"){
      this.price=12450*0.75
    } 
    else {
      this.price=12450
    }
  }
}
