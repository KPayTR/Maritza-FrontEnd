import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthApiService } from 'src/app/services/api-yatirimim.service';
import { AppService } from 'src/app/services/app.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private appService: AppService,
    private authApiService: AuthApiService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {

      const currentToken = this.appService.accessToken;

      if (currentToken != null && currentToken.length > 0) {
        const expiry = (JSON.parse(atob(currentToken.split('.')[1]))).exp;
        const isExpired = (Math.floor((new Date).getTime() / 1000)) >= expiry;

        if (this.appService.user == undefined || isExpired) {
          this.appService.toggleLoader(true).then(() => {
            this.authApiService.refreshtoken(this.appService.accessToken, this.appService.user.id.toString()).subscribe(
              (v) => {
                this.appService.accessToken = v.token;
                this.appService.toggleLoader(false);
                resolve(true);
              },
              (e) => {
                console.log(e);
                this.appService.toggleLoader(false);
                resolve(false)
              }
            );
          })
        }
        else {
          resolve(true);
        }
      }
      else {
        this.router.navigate(["/auth/login"], { queryParams: { returnUrl: state.url } });
        resolve(false);
      }
    });

  }
}
