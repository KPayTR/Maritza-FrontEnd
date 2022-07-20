import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetsApiService, BankaccountApiService, UserBankAccountModel } from 'src/app/services/api-yatirimim.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-deposit-eft',
  templateUrl: './deposit-eft.page.html',
  styleUrls: ['./deposit-eft.page.scss'],
})
export class DepositEftPage implements OnInit {
  accounts: UserBankAccountModel[];

  constructor(
    public appService: AppService,
    private zone: NgZone,
    private router: Router,
    private assetsApiService: AssetsApiService,
    private bankAccountApiService: BankaccountApiService
  ) { }

  ngOnInit() {
    this.appService.toggleLoader(true).then(() => {
      this.bankAccountApiService.getaccounts()
        .subscribe(
          (v) => this.onAccountsLoad(v),
          (e) => this.onError(e)
        )
    })
  }

  onError(e: any): void {
    console.log("banks erroro", e)

    this.zone.run(() => {
      this.appService.toggleLoader(false);
      this.appService.showErrorAlert(e);
    });
  }

  onAccountsLoad(v: UserBankAccountModel[]): void {
    console.log("banks", v)
    this.zone.run(() => {
      this.accounts = v;
    });
 
  }
  goDetail(){
    this.router.navigate(['/transfer/deposit-eft/bank-detail'])
  }
}
