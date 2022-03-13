import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicConfig } from '@ionic/core';
import { SharedComponentsModule } from '../components/shared-components.module';
import { MARITZA_API_URL } from '../services/api-yatirimim.service';
import { AppService } from '../services/app.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 

const ionicConfig: IonicConfig = {
  mode: "ios",
  backButtonText: '',
  backButtonIcon: '../../assets/img/icon/navigationBack.svg'
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(ionicConfig),
    AppRoutingModule,
    SharedComponentsModule
  ],
  providers: [
    BarcodeScanner,
    AppService,
    { provide: MARITZA_API_URL, useValue:"http://api.yatirimim.local/swagger"},
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
