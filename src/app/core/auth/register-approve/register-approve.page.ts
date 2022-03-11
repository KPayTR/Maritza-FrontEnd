import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AppService, User } from 'src/app/services/app.service';

@Component({
  selector: 'app-register-approve',
  templateUrl: './register-approve.page.html',
  styleUrls: ['./register-approve.page.scss'],
})
export class RegisterApprovePage implements OnInit {
  emailCheck: boolean = true;
  tempUser: User;

  constructor(
    private router: Router,
    private alertController: AlertController,
    public loadingController: LoadingController,
    private appService: AppService
  ) { }

  ngOnInit() {
  }
  login() { 
    console.log('ss');
    
      this.tempUser = new User();
      this.tempUser.phone = '+90' + "5551112233";
      this.tempUser.pass = "1234"; 

      if (
        this.tempUser.phone == '+905551112233' &&
        this.tempUser.pass == '1234'
      ) {
        this.appService.user = this.tempUser; 
        this.router.navigate(["app/home"], { replaceUrl: true });

      } else { 

      
      } 
  }
} 