import { Component, NgZone, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BankaccountApiService, BankApiService, BankModel, UserBankAccountModel } from 'src/app/services/api-yatirimim.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.page.html',
  styleUrls: ['./account-create.page.scss'],
})
export class AccountCreatePage implements OnInit {

  isAgreementAccepted = false;

  bank = "";
  name = "";
  iban = "";
  banks: BankModel[];

  constructor(
    public appService: AppService,
    private zone: NgZone,
    private bankAccountApiService: BankaccountApiService,
    private bankApiService: BankApiService,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.bankApiService.getlist()
      .subscribe(
        (v) => { this.banks = v },
        (e) => this.appService.showErrorAlert(e)
      )
  }

  addAccount() {
    const model = new UserBankAccountModel();
    model.accountNo = this.iban;
    model.name = this.name;
    model.bankId = parseInt(this.bank);
    model.symbolId = 5; // TODO Turk Lirasi

    this.appService.toggleLoader(true).then(() => {
      this.bankAccountApiService.saveaccount(model)
        .subscribe(
          (v) => this.onLoad(),
          (e) => this.onError(e)
        )
    })
  }

  onLoad(): void {
    this.zone.run(() => {
      this.appService.toggleLoader(false);
      this.navController.back();
    });
  }

  onError(e: any): void {
    this.zone.run(() => {
      this.appService.toggleLoader(false);
      this.appService.showErrorAlert(e);
    });
  }
}
