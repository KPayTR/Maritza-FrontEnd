import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AuthApiService,
  TokenModel,
  VerifyModel,
} from 'src/app/services/api-yatirimim.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-login-approve',
  templateUrl: './login-approve.page.html',
  styleUrls: ['./login-approve.page.scss'],
})
export class LoginApprovePage implements OnInit {
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  constructor(
    private route: ActivatedRoute,
    private zone: NgZone,
    private router: Router,
    private appService: AppService,
    private authService: AuthApiService
  ) {}

  ngOnInit() {}
  login() {
    const model = new VerifyModel();
    model.otp = this.p1 + this.p2 + this.p3 + this.p4;
    model.phoneNumber = this.appService.user.phone;

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
    this.appService.toggleLoader(true).then((res) => {
      this.authService.checkphonenumber(this.appService.user.phone).subscribe(
        (v) => this.onReCode(v),
        (e) => this.onError(e)
      );
    });
  }
  onReCode(v: void): void {
    this.zone.run(() => {
      this.appService.toggleLoader(false);
      console.log(v);
      this.appService.showToast("Yeniden Kod Gönderildi","bottom")
    });
  }
  onError(e: any): void {
    this.zone.run(() => {
      this.appService.toggleLoader(false);
      this.appService.showErrorAlert(e);
    });
  }
}
