import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-convert-approve',
  templateUrl: './convert-approve.page.html',
  styleUrls: ['./convert-approve.page.scss'],
})
export class ConvertApprovePage implements OnInit {

  constructor( public modalCtrl:ModalController) { }

  ngOnInit() {
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
