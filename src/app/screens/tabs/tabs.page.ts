import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MenuPage } from 'src/app/core/modals/menu/menu.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private router: Router,
    private modalCtrl: ModalController,

  ) {}
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: MenuPage,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5,
      swipeToClose:true
    });
    await modal.present();
  }

  openBuy() {
    this.router.navigateByUrl('/app/trade/buy')
  }

  openSell() {
    this.router.navigateByUrl('/app/trade/sell')
  }
}
