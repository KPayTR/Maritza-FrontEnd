import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.page.html',
  styleUrls: ['./add-card.page.scss'],
})
export class AddCardPage implements OnInit {

  cardHolder: string;
  cardNo: string;
  cardExpireDate: string;
  cardCvc: string;
  isAgreementAccepted: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
