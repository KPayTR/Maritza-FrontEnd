import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-register-approve',
  templateUrl: './register-approve.page.html',
  styleUrls: ['./register-approve.page.scss'],
})
export class RegisterApprovePage implements OnInit {
  emailCheck: boolean = true;

  constructor(
    private router: Router,
    private alertController: AlertController,
    public loadingController: LoadingController,
    private appService: AppService
  ) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(["app/home"], { replaceUrl: true });
  }
} 