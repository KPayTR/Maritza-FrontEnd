import { Component, Inject, OnInit, Optional } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MARITZA_API_URL } from 'src/app/services/api-yatirimim.service';

declare const TradingView: any;

@Component({
  selector: 'app-technical-analysis',
  templateUrl: './technical-analysis.page.html',
  styleUrls: ['./technical-analysis.page.scss'],
})
export class TechnicalAnalysisPage implements OnInit {

  technicalAnalysisUrl;

  constructor(
    private sanitizer: DomSanitizer,
    @Optional() @Inject(MARITZA_API_URL) baseUrl?: string
  ) {
    this.technicalAnalysisUrl = sanitizer.bypassSecurityTrustResourceUrl(baseUrl + '/api/proxy/tradingview/technicalanalysis');
  }

  ngOnInit() {

  }

}
