import { Component, NgZone, OnInit } from '@angular/core';
import { BankaccountApiService, UserBankAccountModel } from 'src/app/services/api-yatirimim.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.page.html',
  styleUrls: ['./bank-account.page.scss'],
})
export class BankAccountPage implements OnInit {
  accounts: UserBankAccountModel[];

  constructor(
    public appService: AppService,
    private zone: NgZone,
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
      this.appService.toggleLoader(false);
      this.accounts = v;
    });
  }
}
