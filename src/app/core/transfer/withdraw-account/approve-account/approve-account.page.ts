import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { BankaccountApiService, CommissionApiService, DemandType, Request, RequestModel, RequestType, UserBankAccountModel, WithdrawalsApiService } from 'src/app/services/api-yatirimim.service';
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
    private alertController: AlertController,
    private withdrawalsApiService: WithdrawalsApiService,
    private navController: NavController
  ) {

  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.accountId = parseInt(params.account);
        this.amount = parseInt(params.amount);

        const model = new RequestModel();
        model.symbolId = 5;
        model.price = this.amount;
        model.userBankAccountId = this.accountId;

        this.withdrawalsApiService.preparedigital(model)
          .subscribe(
            v => { this.request = v },
            e => this.appService.showErrorAlert(e)
          )
      });
  }

  approve() {
    const model = new Request();
    model.symbolId = 5;
    model.price = this.amount;
    model.userBankAccountId = this.accountId;
    
    this.withdrawalsApiService.adddigital(model)
      .subscribe(
        v => this.onSuccess(v),
        e => this.appService.showErrorAlert(e)
      )
  }

  async onSuccess(v: RequestModel) {
    const alert = await this.alertController.create({
      header: 'Başarılı!',
      message: 'Çekim talebiniz başarıyla iletildi',
      buttons: ['Tamam'],
    });

    await alert.present();

    await alert.onDidDismiss();

    this.navController.navigateRoot('/app/home');
  }

}
