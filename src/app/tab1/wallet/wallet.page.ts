import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  boolVarlik = "altin";

  constructor(
    private router: Router

  ) { }

  ngOnInit() {
  }
  segmentChanged(temp) {
    this.boolVarlik = temp.detail.value;
  }
  goBuy(){
    this.router.navigate(['/buySell/buy'])
  }
  goSell(){
    this.router.navigate(['/buySell/sell'])
  }
  goWithdraw(){
    this.router.navigate(['/transfer/deposit-credit-card'])
  }
  goDeposit(){
    this.router.navigate(['/transfer/withdraw-account'])
  }
}
