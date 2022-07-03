import { Component, NgZone, OnInit } from '@angular/core';
import { MemberApiService, MemberBankAccountDTO } from 'src/app/services/api-hkn-yatirimim.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.page.html',
  styleUrls: ['./bank-account.page.scss'],
})
export class BankAccountPage implements OnInit {

  constructor(  
    public appService: AppService,
    private zone: NgZone,
    private cardService:MemberApiService
    ) { }
    accounts :MemberBankAccountDTO[];
  ngOnInit() {
    this.appService.toggleLoader(true).then(()=>{
      this.cardService.getMemberBankAccounts()
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
  onLoad(v: MemberBankAccountDTO[]): void {
    this.zone.run(() => {
      this.appService.toggleLoader(false); 
      this.accounts=v;
      console.log(v)
     });
  } 
}
