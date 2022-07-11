import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BankaccountApiService, RequestModel, UserBankAccountModel, WithdrawalsApiService } from 'src/app/services/api-yatirimim.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-approve-account',
  templateUrl: './approve-account.page.html',
  styleUrls: ['./approve-account.page.scss'],
})
export class ApproveAccountPage implements OnInit {
  accountId: number;
  amount: number;
  request: RequestModel;

  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private withdrawalsApiService: WithdrawalsApiService
  ) {

  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.accountId = parseInt(params.account);
        this.amount = parseInt(params.amount);

        const model = new RequestModel();
        model.price = this.amount;
        model.userBankAccountId = this.accountId;

        this.withdrawalsApiService.preparedigital(model)
          .subscribe(
            v => { this.request = v },
            e => this.appService.showErrorAlert(e)
          )
      });
  }

}
