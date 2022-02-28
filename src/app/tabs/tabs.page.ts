import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MenuPage } from '../modals/menu/menu.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private modalCtrl: ModalController,
    private router: Router
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
  goBuy(){
    this.router.navigate(['/buySell/buy'])

  }
  goSell(){
    this.router.navigate(['/buySell/sell'])
  }
}
