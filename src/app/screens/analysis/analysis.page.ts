import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analysis',
  templateUrl: 'analysis.page.html',
  styleUrls: ['analysis.page.scss']
})
export class AnalysisPage {

  currentUrl: string;

  constructor(
    public router: Router
  ) {
    this.currentUrl = this.router.url;
  }

  onSegmentChange(e) {
    this.currentUrl = e.detail.value;
    this.router.navigateByUrl(this.currentUrl);
  }
}
