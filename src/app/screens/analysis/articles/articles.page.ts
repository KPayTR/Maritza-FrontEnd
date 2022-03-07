import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailsPage } from './details/details.page';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {
  constructor(
    private modalCtrl: ModalController

  ) { }

  ngOnInit() {
  }
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: DetailsPage,
      breakpoints: [1, 1, 1, 1],
      initialBreakpoint: 1,
      swipeToClose: true
    });
    await modal.present();
  }
}
