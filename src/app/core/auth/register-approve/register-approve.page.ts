import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-approve',
  templateUrl: './register-approve.page.html',
  styleUrls: ['./register-approve.page.scss'],
})
export class RegisterApprovePage implements OnInit {
  emailCheck: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
