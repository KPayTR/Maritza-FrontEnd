import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthApiService, LoginModel } from 'src/app/services/api-yatirimim.service';
import { AppService, LocalUser } from 'src/app/services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  phone: string;
  password: string;
  tempUser: LocalUser;
  constructor(
    private router: Router,
    private alertController: AlertController,
    public loadingController: LoadingController,
    private authService: AuthApiService,
    private zone: NgZone,
    private appService: AppService,

  ) { }

  login() {
    if (this.phone != null && this.password != null) {
      this.phone = this.phone.replace(/[\s.*+\-?^${}()|[\]\\]/g, '');
      console.log(this.phone, this.password)
      this.tempUser = new LocalUser();
      this.tempUser.phoneNumber = '90' + this.phone;
      this.tempUser.password = this.password;

      const model = new LoginModel();
      model.phoneNumber = this.tempUser.phoneNumber;
      model.password = this.tempUser.password;

      this.appService.toggleLoader(true).then((res) => {

        this.authService.login(model)
          .subscribe(
            v => this.onLogin(),
            e => this.onError(e)
          )
      });
    } else {

      this.presentAlert(
        'Yanlış telefon numarası yada şifre girdiniz. Lütfen kontrol edip tekrar deneyiniz.'
      );
    }
  }
  onLogin(): void {
    this.zone.run(() => {
      console.log("gel")
      this.appService.toggleLoader(false);
      this.appService.userPhone = this.tempUser.phoneNumber;
      this.appService.userPass = this.tempUser.password;
      this.router.navigate(['/auth/login-approve'])
    });
  }

  onError(e: any): void {
    this.zone.run(() => {
      console.log("git",e)

      this.appService.toggleLoader(false);
      this.appService.showErrorAlert(e);
    });
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

  openReset() {
    
  }
}
