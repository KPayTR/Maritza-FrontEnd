import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-withdraw-account',
  templateUrl: './withdraw-account.page.html',
  styleUrls: ['./withdraw-account.page.scss'],
})
export class WithdrawAccountPage implements OnInit {

  amount: number;

  constructor() { }

  ngOnInit() {
  }

  valueChange(event: any) {
    this.amount = event.value;
  }
}
