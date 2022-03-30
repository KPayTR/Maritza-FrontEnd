import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthApiService, LoginModel } from 'src/app/services/api-yatirimim.service';
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
    private authService:AuthApiService,
    private zone: NgZone,
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

      const model = new LoginModel();
      model.phoneNumber= this.tempUser.phone;
      model.password= this.tempUser.pass;
      this.appService.toggleLoader(true).then((res) => {
        this.authService.login(model)
            .subscribe(
                v => this.onLogin(v),
                e => this.onError(e)
            ) 
          }); 
    } else { 

      this.presentAlert(
        'Yanlış telefon numarası yada şifre girdiniz. Lütfen kontrol edip tekrar deneyiniz.'
      );
    }
  }  
  onLogin(v: void): void {
    this.zone.run(() => {
      this.appService.toggleLoader(false);
      this.appService.user = this.tempUser; 
      console.log(v);
    this.router.navigate(['/auth/login-approve'])
    });
  }
  onError(e: any): void {
    this.zone.run(() => {
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
}
