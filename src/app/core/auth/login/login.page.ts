import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  phone: string;
  password: string;
  constructor() { }

  ngOnInit() {
  }
  openReset() {
    
  }
}
