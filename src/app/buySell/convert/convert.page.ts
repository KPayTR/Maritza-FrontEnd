import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConvertApprovePage } from 'src/app/modals/convert-approve/convert-approve.page';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.page.html',
  styleUrls: ['./convert.page.scss'],
})
export class ConvertPage implements OnInit {

  constructor(
    private modalCtrl: ModalController

  ) { }

  ngOnInit() {
  }

  segmentChanged(e) {
    
  }
  selectChangeMain(e) {
    
  }
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ConvertApprovePage,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.8,
      swipeToClose: true
    });
    await modal.present();
  }
}
