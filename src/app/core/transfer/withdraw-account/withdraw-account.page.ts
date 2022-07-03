import { Component, NgZone, OnInit } from '@angular/core'; 
import { MemberApiService, MemberBankAccountDTO } from 'src/app/services/api-hkn-yatirimim.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-withdraw-account',
  templateUrl: './withdraw-account.page.html',
  styleUrls: ['./withdraw-account.page.scss'],
})
export class WithdrawAccountPage implements OnInit {

  amount: number;

  constructor(  
    public appService: AppService,
    private zone: NgZone,
    private cardService:MemberApiService
    ) { }

  ngOnInit() {
    // this.appService.toggleLoader(true).then(()=>{
    //   this.cardService.getMemberBankAccounts()
    //     .subscribe(
    //       (v) => this.onLoad(v),
    //       (e) => this.onError(e)
    //     )
    // })
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
      console.log(v)
     });
  }
  valueChange(event: any) {
    this.amount = event.value;
  }
}
