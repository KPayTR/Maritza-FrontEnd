import { Component, OnInit, NgZone } from '@angular/core';
import * as moment from 'moment';
import {
  MatriksApiService,
  MatriksNewsModel,
  MatriksNewsModelData,
} from 'src/app/services/api-yatirimim.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  
  news: MatriksNewsModelData[]=[];

  constructor(
    private appService: AppService,
    private zone: NgZone,
    private matriksService: MatriksApiService
  ) {}

  ngOnInit() {
    this.getNews();
  }

  getNews() {
    this.appService.toggleLoader(true).then((res) => {
      this.matriksService.getmatriksnewsdata().subscribe(
        (v) => this.onNews(v),
        (e) => this.onError(e)
      );
    });
  }
  onError(e: any): void {
    this.zone.run(() => {
      this.appService.toggleLoader(false);
      this.appService.showErrorAlert(e);
    });
  }
  onNews(v: MatriksNewsModel): void {
    this.zone.run(() => {
      this.appService.toggleLoader(false);
      console.log(v);
      this.news = v.data;
      console.log(this.news);
    });
  }

  getDescription(v: MatriksNewsModelData) {
    let span = document.createElement('span');
    span.innerHTML = v.icerik;
    let desc = span.textContent || span.innerText;

    if(desc?.length > 160) {
      desc= desc.substring(0, 160) + '...';
    }
    
    return desc;
  }
  formatDate(v: MatriksNewsModelData) {
    return moment(v.tarih, 'DD.MM.YYYY hh:mm:ss').format('DD MMMM')
  }

  formatTime(v: MatriksNewsModelData) {
    return moment(v.tarih, 'DD.MM.YYYY hh:mm:ss').format('HH:mm')
  }
}
