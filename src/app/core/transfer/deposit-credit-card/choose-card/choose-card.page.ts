import { Component, NgZone, OnInit } from '@angular/core';
import { MemberApiService, MemberBankAccountDTO } from 'src/app/services/api-hkn-yatirimim.service';
import { CardApiService } from 'src/app/services/api-yatirimim.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-choose-card',
  templateUrl: './choose-card.page.html',
  styleUrls: ['./choose-card.page.scss'],
})
export class ChooseCardPage implements OnInit {

  constructor(
    public appService: AppService,
    private zone: NgZone,
    public cardApiService: CardApiService,
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

}
