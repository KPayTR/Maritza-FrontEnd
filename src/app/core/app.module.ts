import {  HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { IonicModule, IonicRouteStrategy, isPlatform } from '@ionic/angular';
import { IonicConfig } from '@ionic/core';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { SharedComponentsModule } from '../components/shared-components.module';
import { TokenInterceptor } from '../helpers/token.interceptor';
import { ApiService, AuthenticationApiService, SymbolApiService } from '../services/api-hkn-yatirimim.service';
import { AssetsApiService, AuthApiService, CardApiService, MARITZA_API_URL, MatriksApiService, SymbolsApiService } from '../services/api-yatirimim.service';
import { AppService } from '../services/app.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const ionicConfig: IonicConfig = {
  mode: "ios",
  backButtonText: '',
  backButtonIcon: '../../assets/img/icon/navigationBack.svg'
}

const isMobile = () => {
  return isPlatform('capacitor') || isPlatform('ios') || isPlatform('android') || isPlatform('ipad') || isPlatform('mobile')
}

if (!isMobile()) {
  ionicConfig.navAnimation = null;
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/lang/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedComponentsModule,
    IonicModule.forRoot(ionicConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    BarcodeScanner,
    ApiService,
    AuthenticationApiService,
    SymbolApiService,
    AppService,
    MatriksApiService,
    AuthApiService,
    SymbolsApiService,
    AssetsApiService,
    CardApiService,
    //{ provide: MARITZA_API_URL, useValue:"http://192.168.253.100:5000"},
    { provide: MARITZA_API_URL, useValue:"https://api.yatirimim.com"},
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
