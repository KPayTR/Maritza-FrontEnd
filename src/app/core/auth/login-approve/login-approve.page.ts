import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthApiService, ForgotModel, TokenModel, VerifyModel } from 'src/app/services/api-yatirimim.service';
import { AppService } from 'src/app/services/app.service';
import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: 'app-login-approve',
  templateUrl: './login-approve.page.html',
  styleUrls: ['./login-approve.page.scss'],
})
export class LoginApprovePage implements OnInit {
  p1: string = '';
  p2: string = '';
  p3: string = '';
  p4: string = '';
  p5: string = '';
  p6: string = '';
  counter = 60;
  isValid: boolean = false;
  authKey: string;
  phone: string;
  formattedPhone: string;
  isViaSmsCode = true;
  isCopied = false;

  constructor(
    private route: ActivatedRoute,
    private zone: NgZone,
    private router: Router,
    private appService: AppService,
    private authService: AuthApiService
  ) {
  }

  ngOnInit() {
    this.startTimer();

    this.route.queryParams.subscribe(params => {
      if (params) {
        this.authKey = params.authKey;
        this.phone = params.phone;
        if (this.phone.length == 10) {
          this.formattedPhone = '+90 ' + this.phone.substring(0, 3) + ' ' + this.phone.substring(3, 6) + ' ' + this.phone.substring(6, 8) + ' ' + this.phone.substring(8, 10);
        }
        else {
          this.formattedPhone = this.phone;
        }
      }
    });
  }

  startTimer() {
    this.counter = 60;
    let intervalId = setInterval(() => {
      this.counter = this.counter - 1;
      if (this.counter === 0) {
        clearInterval(intervalId)
        this.isValid = true;
      }
    }, 1000)
  }

  login() {
    const model = new VerifyModel();
    model.phoneNumber = this.phone;
    if (this.isViaSmsCode) {
      model.otp = this.p1 + this.p2 + this.p3 + this.p4;
    }
    else {
      model.authenticatorCode = this.p1 + this.p2 + this.p3 + this.p4 + this.p5 + this.p6;
    }

    this.appService.toggleLoader(true).then((res) => {
      this.authService.verify(model).subscribe(
        (v) => this.onLogin(v),
        (e) => this.onError(e)
      );
    });
  }

  onLogin(v: TokenModel): void {
    this.zone.run(() => {
      this.appService.toggleLoader(false);
      this.appService.accessToken = v.token;
      console.log(v);
      this.router.navigate(['/app/home']);
    });
  }

  reCode() {
    const model = new ForgotModel()
    model.email = '';
    model.phoneNumber = this.phone;
    this.appService.toggleLoader(true).then((res) => {
      this.authService.sendotp(model).subscribe(
        (v) => this.onReCode(v),
        (e) => this.onError(e)
      );
    });
  }

  onReCode(v: void): void {
    this.zone.run(() => {
      this.appService.toggleLoader(false);
      this.startTimer()
      this.appService.showToast("Yeniden Kod Gönderildi", "bottom")
    });
  }

  onError(e: any): void {
    this.zone.run(() => {
      this.appService.toggleLoader(false);
      this.appService.showErrorAlert(e);
    });
  }

  gotoNextField(nextElement, prevElement, e) {
    var key = e.keyCode || e.charCode;

    if (key == 8 || key == 46) {
      console.log('s', prevElement)
      prevElement.setFocus();
    }
    else {
      nextElement.setFocus();

    }
  }

  async copyAuthKey() {
    await Clipboard.write({
      string: this.authKey
    });
    this.isCopied = true;

    setTimeout(() => {
      this.isCopied = false;
    }, 2000);
  }

  toggleVerifyMethod(value: 'otp' | 'google') {
    this.isViaSmsCode = value == 'otp';
    this.p1 = this.p2 = this.p3 = this.p4 = this.p5 = this.p6 = '';
  }
}
