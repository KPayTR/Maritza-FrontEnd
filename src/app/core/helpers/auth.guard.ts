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
      const currentUser = this.appService.user;
      if (currentUser != null && currentUser.id > 0) {
        resolve(true);

        /*
        if (this.appService.user == undefined) {
          this.appService.toggleLoader(true).then(() => {
            this.authApiService.refreshtoken().subscribe(
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
        */
      }
      else {
        this.router.navigate(["/auth/login"], { queryParams: { returnUrl: state.url } });
        resolve(false);
      }
    });

  }
}
