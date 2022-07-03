import { Component, NgZone, OnInit } from '@angular/core';
import { MemberApiService, MemberBankAccountDTO } from 'src/app/services/api-hkn-yatirimim.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.page.html',
  styleUrls: ['./account-create.page.scss'],
})
export class AccountCreatePage implements OnInit {
  isAgreementAccepted=false;
  constructor(
    public appService: AppService,
    private zone: NgZone,
    private cardService:MemberApiService
  ) { }
    bank="";
    name="";
    iban="";
  ngOnInit() {
  }
  addAccount() {
    const model = new MemberBankAccountDTO();
    model.iBANNo=this.iban;
    model.name= this.bank;
    model.rID= 1;

    console.log(model)
    this.appService.toggleLoader(true).then(()=>{
      this.cardService.createMemberBankAccount(model)
        .subscribe(
          (v) => this.onLoad(v),
          (e) => this.onError(e)
        )
    })
  }
  onLoad(v: MemberBankAccountDTO): void {
     this.zone.run(() => {
      this.appService.toggleLoader(false);  
      console.log(v)
     });
  }
  onError(e: any): void {
    this.zone.run(() => {
      this.appService.toggleLoader(false);
      this.appService.showErrorAlert(e);
    });
  } 
}
