import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-phone-approve',
  templateUrl: './phone-approve.page.html',
  styleUrls: ['./phone-approve.page.scss'],
})
export class PhoneApprovePage implements OnInit {
  phone: string = ""
  code: string;
  buttonDisabled: boolean = true;
  step: number = 1;
  constructor() { }

  ngOnInit() {
    this.step = 1;
  }
  phoneChange() {
    console.log(this.phone)
    if (this.phone.length > 10) {
      this.buttonDisabled = false
    }
  }
  stepContinue() {
    this.step++;
  }
}
