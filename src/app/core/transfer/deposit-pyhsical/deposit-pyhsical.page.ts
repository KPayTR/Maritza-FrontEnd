import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deposit-pyhsical',
  templateUrl: './deposit-pyhsical.page.html',
  styleUrls: ['./deposit-pyhsical.page.scss'],
})
export class DepositPyhsicalPage implements OnInit {
  phone = ''
  date;
  yearValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

  constructor() { }

  ngOnInit() {
  }
  selectChangeMain(e) {

  }
  phoneChange() { }

  valueChange(e) {}
}
