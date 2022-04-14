import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { AuthApiService, TokenModel } from './api-yatirimim.service';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class TokenRefreshService { 

  constructor(
    private appService: AppService,
    private zone: NgZone,
    private authService: AuthApiService
  ) {}

  public init() {
    this.authService.refreshtoken().subscribe(
      (v) => this.onResponse(v),
      (e) => this.onError(e)
    );
  }
  onResponse(v: TokenModel): void {
    this.zone.run(() => {
      this.appService.accessToken = v.token;
    });
  }

  onError(e: any): void {
    this.zone.run(() => {
      this.appService.showErrorAlert(e);
    });
  }
}
