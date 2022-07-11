import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankaccountApiService, UserBankAccountModel } from 'src/app/services/api-yatirimim.service';
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

  constructor(
    public appService: AppService,
    private zone: NgZone,
    private router: Router,
    private bankAccountApiService: BankaccountApiService
  ) { }

  ngOnInit() {
    this.appService.toggleLoader(true).then(() => {
      this.bankAccountApiService.getaccounts()
        .subscribe(
          (v) => this.onLoad(v),
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

  onLoad(v: UserBankAccountModel[]): void {
    this.zone.run(() => {
      this.accounts = v;
      this.appService.toggleLoader(false);
    });
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
