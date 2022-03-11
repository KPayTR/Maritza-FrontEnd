import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { AppService, User } from 'src/app/services/app.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
}) 

export class AuthPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides; 
  user: User;
  constructor(
    private appService:AppService
  ) { }

  ngOnInit() {
    this.user= new User();
    this.user.phone= null;
    this.user.pass=null; 
    this.appService.user=this.user;
 
    console.log("li", this.appService.user)
  }
  slidePrev() {
    this.slides.slidePrev();
  }
  slideNext() {
    this.slides.slideNext();
  }
}
