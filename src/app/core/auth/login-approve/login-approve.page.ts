import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationApiService, AuthenticationRequestDTO, AuthenticationResponseDTO, DeviceTypeEnum, OTPTypeEnum } from 'src/app/services/api-hkn-yatirimim.service';
import {
  AuthApiService,
  ForgotModel,
  TokenModel,
  VerifyModel,
} from 'src/app/services/api-yatirimim.service';
import { AppService } from 'src/app/services/app.service';
import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: 'app-login-approve',
  templateUrl: './login-approve.page.html',
  styleUrls: ['./login-approve.page.scss'],
})
export class LoginApprovePage  {
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  p5: string;
  p6: string; 
  counter=60;
  isValid: boolean = false;
  phone;
  pass;
  isCopied: boolean;
  isViaSmsCode: boolean;
  authKey: string;
  constructor(
    private route: ActivatedRoute,
    private zone: NgZone,
    private router: Router,
    private appService: AppService,
    private authService: AuthApiService,
    private authApi : AuthenticationApiService
  ) { 
    this.phone=this.appService.userPhone.replace(/\s/g, "");
    this.pass=this.appService.userPass;
    console.log("s",this.phone)
    this.startTimer()
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
    model.otp = this.p1 + this.p2 + this.p3 + this.p4+ this.p5 + this.p6;
    model.phoneNumber = this.phone;
    if (this.isViaSmsCode) {
      model.otp = this.p1 + this.p2 + this.p3 + this.p4;
    }
    else {
      model.authenticatorCode = this.p1 + this.p2 + this.p3 + this.p4 + this.p5 + this.p6;
    }

    this.appService.toggleLoader(true).then((res) => {
      this.authApi.checkOTP(OTPTypeEnum.SMS,model.phoneNumber,model.otp)
      .subscribe(
        (v) => this.onLogin(v),
        (e) => this.onError(e)
      );
    });
  }
  onLogin(v): void {
    this.zone.run(() => {
      console.log("sd")
      const model = new AuthenticationRequestDTO();
      model.deviceID= "123";
      model.deviceType=DeviceTypeEnum.AndroidPhone;
      model.fCMToken="123123"
      model.gSMNo=this.phone;
      model.isNewDevice=false;
      model.password=this.pass;

      this.authApi.authenticate(model)
      .subscribe(
        (v) => this.onAuth(v),
        (e) => this.onError(e)
      );
     
    });
  }
  onAuth(v: AuthenticationResponseDTO): void {
      this.appService.toggleLoader(false);
      console.log(v)
      this.appService.accessToken = v.jWT; 
      this.router.navigate(['/app/home']);
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
      console.log(e)
      this.appService.showErrorAlert(e.message);
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
