import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetModel, AssetsApiService, BankaccountApiService, UserBankAccountModel } from 'src/app/services/api-yatirimim.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-withdraw-account',
  templateUrl: './withdraw-account.page.html',
  styleUrls: ['./withdraw-account.page.scss'],
})
export class WithdrawAccountPage implements OnInit {

  amount: number;
  accounts: UserBankAccountModel[];
  selectedAccountId: number;
  tlAsset: AssetModel;

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
    this.zone.run(() => {
      this.appService.toggleLoader(false);
      this.appService.showErrorAlert(e);
    });
  }

  onAccountsLoad(v: UserBankAccountModel[]): void {
    this.zone.run(() => {
      this.accounts = v;
    });

    this.loadWallet();
  }

  loadWallet() {
    this.assetsApiService.getwallet()
      .subscribe(
        v => this.onWalletLoad(v),
        e => {
          this.appService.toggleLoader(false)
          this.appService.showToast('Veri yüklenemedi.', 'bottom')
        }
      )
  }

  onWalletLoad(v: AssetModel[]): void {
    this.appService.toggleLoader(false)
    this.tlAsset = v.find(x => x.symbol.isMainCurrency);
  }

  valueChange(event: any) {
    this.amount = event.value;
  }

  goApprove() {
    this.router.navigate(['transfer', 'withdraw-account', 'approve-account'],
      {
        queryParams: {
          account: this.selectedAccountId,
          amount: this.amount
        }
      })
  }

}
