import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../services/app.service';
import { MARITZA_API_URL } from '../services/api-yatirimim.service';


@Injectable()
export class TokenInterceptor {
  yatırımımApiBaseUrl: string;

  /**
   * Creates an instance of TokenInterceptor.
   * @param {AppService} appService
   * @memberof TokenInterceptor
   */
  constructor(
    public appService: AppService,
    @Optional() @Inject(MARITZA_API_URL) baseUrl?: string
  ) {
    this.yatırımımApiBaseUrl = baseUrl;
  }

  /**
   * Intercept all HTTP request to add JWT token to Headers
   * @param {HttpRequest<any>} request
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   * @memberof TokenInterceptor
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf(this.yatırımımApiBaseUrl) > -1) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.appService.accessToken}`
        }
      });
    }


    return next.handle(request);
  }
}
