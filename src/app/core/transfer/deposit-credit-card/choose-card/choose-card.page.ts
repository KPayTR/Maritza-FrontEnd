import { Component, OnInit } from '@angular/core';
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
    public cardApiService: CardApiService
  ) { }

  ngOnInit() {
    this.appService.toggleLoader(true).then(()=>{
      this.cardApiService.getcards()
        .subscribe(
          v => {
            this.appService.toggleLoader(false);
          },
          e => {
            this.appService.toggleLoader(false);
            console.log(e);
          }
        )
    })
  }

}
