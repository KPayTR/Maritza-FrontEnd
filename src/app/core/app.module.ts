import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicConfig } from '@ionic/core';
import { SharedComponentsModule } from '../components/shared-components.module';

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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
