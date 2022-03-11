import { Component } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class Home {
  barcodeResult: string;

  selectedSegment = 'gold'
  selectedChartType = 'candle';
  selectedTimeRange = '5';

  data = {

  }

  constructor(
    private barcodeScanner: BarcodeScanner, 

  ) { }

  ionViewDidEnter() {
    
  }

  segmentChanged(e) {
    this.selectedSegment = e.detail.value;
  }

  chartTypeChange(e) {
    this.selectedChartType = e.detail.value;
  }

  timeRangeChange(e) {
    this.selectedTimeRange = e.detail.value;
  }
  start() {
    this.barcodeScanner
      .scan({
        orientation: "portrait",
        formats: "QR_CODE",
        resultDisplayDuration: 0,
      })
      .then((barcodeData) => {
        console.log("Barcode data", barcodeData);
        if (barcodeData == undefined || barcodeData.text.length == 0) {
          //this.appService.showAlert("İşlemi İptal Ettiniz.");
          console.log("Barcode data", barcodeData);
        } else {
          this.barcodeResult = barcodeData.text.trim();
          // this.appService.showErrorAlert(
          //   "initMetropolQR " + this.barcodeResult
          // );
        //  this.checkout(this.barcodeResult);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }
}
