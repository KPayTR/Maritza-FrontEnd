import { Component, NgZone, OnInit } from '@angular/core';
import { GraphicDataModel, MatriksApiService, MatriksGraphType, SymbolRateModel } from 'src/app/services/api-yatirimim.service';
import { AppService } from 'src/app/services/app.service';
import { MarketDataService } from 'src/app/services/market-data.service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.page.html',
  styleUrls: ['./alarm.page.scss'],
})
export class AlarmPage implements OnInit {
  lineData: any[] = []
  selectedTimeRange = '1';
  symbolData: SymbolRateModel;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private zone: NgZone,
    private marketDataService: MarketDataService,
    private matriksService: MatriksApiService,
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.symbolData = this.router.getCurrentNavigation().extras.state.symbol;
      }
    });
    console.log(this.symbolData)
  }

  ngOnInit() {
    if (this.marketDataService.symbols == null) {
      this.marketDataService.symbolsLoad.subscribe(v => {
        this.loadSegmentData();
      })
    }
    else {
      this.loadSegmentData();
    }
  }
  loadSegmentData() {
    if (this.marketDataService.symbols == null) return;
    this.getChartData();
  }
  getChartData() {
    this.appService.toggleLoader(true).then((res) => {
      this.matriksService.getgraphdata(MatriksGraphType[this.selectedTimeRange], "SUSD").subscribe(
        (v) => this.onChartData(v),
        (e) => this.onError(e)
      );
    });
  }

  onChartData(v: GraphicDataModel): void {
    this.zone.run(() => {
      this.appService.toggleLoader(false);
      const lineData = v?.data?.map(x => ({
        time: (moment(x.date, 'DD.MM.YYYY HH:mm:ss').toDate().getTime() / 1000),
        value: x.close
      })).sort((a, b) => (a.time > b.time ? 1 : -1));
      if (lineData != undefined) {
        this.lineData = lineData;
      }


    });
  }

  onError(e: any): void {
    this.zone.run(() => {
      this.appService.toggleLoader(false);
      this.appService.showErrorAlert(e);
    });
  }
}
