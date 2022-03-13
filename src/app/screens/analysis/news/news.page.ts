import { Component, OnInit, NgZone } from '@angular/core';
import {
  MatriksApiService,
  MatriksNewsModel,
} from 'src/app/services/api-yatirimim.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  news: MatriksNewsModel;
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
      this.news = v;
      console.log(this.news);
    });
  }
}
