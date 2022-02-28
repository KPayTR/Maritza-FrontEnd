import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  barcodeResult: string;

  constructor(
    private barcodeScanner: BarcodeScanner, 
  ) { }

  ngOnInit() {
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
