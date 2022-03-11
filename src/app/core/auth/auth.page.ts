import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
}) 

export class AuthPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides; 
  constructor() { }

  ngOnInit() {
  }
  slidePrev() {
    this.slides.slidePrev();
  }
  slideNext() {
    this.slides.slideNext();
  }
}
