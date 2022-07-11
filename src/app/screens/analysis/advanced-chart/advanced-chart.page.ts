import { Component, Inject, OnInit, Optional } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MARITZA_API_URL } from 'src/app/services/api-yatirimim.service';

declare const TradingView: any;

@Component({
  selector: 'app-advanced-chart',
  templateUrl: './advanced-chart.page.html',
  styleUrls: ['./advanced-chart.page.scss'],
})
export class AdvancedChartPage implements OnInit {

  advancedChartUrl;

  constructor(
    private sanitizer: DomSanitizer,
    @Optional() @Inject(MARITZA_API_URL) baseUrl?: string
  ) {
    this.advancedChartUrl = sanitizer.bypassSecurityTrustResourceUrl(baseUrl + '/api/proxy/tradingview/advancedchart');
  }

  ngOnInit() {

  }

}
