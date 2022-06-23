import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposit-eft',
  templateUrl: './deposit-eft.page.html',
  styleUrls: ['./deposit-eft.page.scss'],
})
export class DepositEftPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goDetail(){
    this.router.navigate(['/transfer/deposit-eft/bank-detail'])
  }
}
