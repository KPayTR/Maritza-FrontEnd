import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-approve',
  templateUrl: './orders-approve.page.html',
  styleUrls: ['./orders-approve.page.scss'],
})
export class OrdersApprovePage implements OnInit {
  countdown=10;
  constructor() { 
    this.timer()
  }
  timer(){
    this.countdown=10;
    let intervalId = setInterval(() => {
      this.countdown = this.countdown - 1;
      if(this.countdown === 0) 
      {
        clearInterval(intervalId)
        //this.isValid = true;
      }
  }, 1000)
  }
  ngOnInit() {
   
  }

}
