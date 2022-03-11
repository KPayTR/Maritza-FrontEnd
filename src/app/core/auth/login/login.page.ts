import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AppService, User } from 'src/app/services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  phone: string;
  password: string;
  tempUser: User;
  constructor(
    private router: Router,
    private alertController: AlertController,
    public loadingController: LoadingController,
    private appService: AppService
  ) {}

  ngOnInit() {}
  openReset() {}
  login() {
    //routerDirection="forward"    [routerLink]="['../login-approve']"
    console.log('ss');
    if (this.phone != null && this.password != null) {
      this.phone = this.phone.replace(/[\s.*+\-?^${}()|[\]\\]/g, '');

      this.tempUser = new User();
      this.tempUser.phone = '+90' + this.phone;
      this.tempUser.pass = this.password; 

      if (
        this.tempUser.phone == '+905551112233' &&
        this.tempUser.pass == '1234'
      ) {
        this.appService.user = this.tempUser; 
        this.router.navigate(["auth/login-approve"], { replaceUrl: true });

      } else { 

        this.presentAlert(
          'Yanlış telefon numarası yada şifre girdiniz. Lütfen kontrol edip tekrar deneyiniz.'
        );
      }
    } else { 

      this.presentAlert(
        'Yanlış telefon numarası yada şifre girdiniz. Lütfen kontrol edip tekrar deneyiniz.'
      );
    }
  }
  async presentAlert(txt) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'UYARI',
      mode: 'ios',
      message: txt,
      buttons: ['Tamam'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
