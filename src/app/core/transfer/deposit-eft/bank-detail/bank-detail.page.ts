import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.page.html',
  styleUrls: ['./bank-detail.page.scss'],
})
export class BankDetailPage implements OnInit {

  constructor(
    private appService: AppService,

  ) { }

  ngOnInit() {
  }
  getCopy(){
    this.appService.showToast("Kopyalandı",'bottom')
  }
}
