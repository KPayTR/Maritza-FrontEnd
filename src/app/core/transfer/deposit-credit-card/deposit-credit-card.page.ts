import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deposit-credit-card',
  templateUrl: './deposit-credit-card.page.html',
  styleUrls: ['./deposit-credit-card.page.scss'],
})
export class DepositCreditCardPage implements OnInit {
  amount: number;
  isValid: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  valueChange(event: any) {
    console.log(event.value)
    this.amount = event.value;
    this.isValid = (this.amount > 0);
  }
}