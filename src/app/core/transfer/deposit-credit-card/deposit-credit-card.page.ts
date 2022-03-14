import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deposit-credit-card',
  templateUrl: './deposit-credit-card.page.html',
  styleUrls: ['./deposit-credit-card.page.scss'],
})
export class DepositCreditCardPage implements OnInit {
  phone:string=""
  buttonDisabled: boolean= true;
  constructor() { }

  ngOnInit() {
  }
  phoneChange(){
    console.log(this.phone)
    if(this.phone.length>0){
      this.buttonDisabled=false
    } 
    console.log(this.buttonDisabled)
  }
}