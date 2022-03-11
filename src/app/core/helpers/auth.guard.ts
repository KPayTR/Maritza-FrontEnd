import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'; 
import { AppService } from 'src/app/services/app.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private appService: AppService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentMember = this.appService.user;
    if (
      currentMember != null &&
      currentMember.phone != undefined &&
      currentMember.phone.length > 0
    ) {
      return true;
    }

    this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
