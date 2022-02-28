import { Component } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  boolVarlik = "altin";
  barcodeResult: string;
  candle= true;
  constructor(
    private barcodeScanner: BarcodeScanner, 

  ) {}
  segmentChanged(temp) {
    this.boolVarlik = temp.detail.value;
  } 
   candleChange(){
    this.candle= !this.candle;
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
