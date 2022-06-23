import { EventEmitter, Injectable, Output } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment';

import { ErrorDto } from './api-yatirimim.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  loaderCount = 0;
  loader: HTMLIonLoadingElement;
  private mUser: LocalUser;

  @Output() 
  themeChange: EventEmitter<string> = new EventEmitter<string>();
  

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private translate: TranslateService
  ) { }

  get userPass(): string {
    return localStorage.getItem("user_pass");
  }

  set userPass(v: string) {
    localStorage.setItem("user_pass", v);
  }

  get userPhone(): string {
    return localStorage.getItem("user_phone");
  }

  set userPhone(v: string) {
    localStorage.setItem("user_phone", v);
  }

  get accessToken(): string {
    return localStorage.getItem("access_token");
  }

  set accessToken(v: string) {
    localStorage.setItem("access_token", v);
  }

  get userTheme(): string {
    return localStorage.getItem("user_theme");
  }

  set userTheme(v: string) {
    localStorage.setItem("user_theme", v);
    this.themeChange.emit(v);
  }

  get currentLanguage(): string {
    let lang = localStorage.getItem("user_lang");

    if (lang == undefined || lang.length == 0) {
      const browserLang = this.translate.getBrowserLang();
      lang = browserLang.match(/tr|en/) ? browserLang : 'tr';
      localStorage.setItem("user_lang", lang);
    }

    moment.locale(lang);

    return lang;
  }

  set currentLanguage(v: string) {
    localStorage.setItem("user_lang", v);

    this.translate.use(v);
    moment.locale(v);

  }

  public get user(): LocalUser {

    if (this.mUser != undefined && this.mUser.id > 0) return this.mUser;

    try {
      const token = localStorage.getItem("access_token");

      if (token != undefined && token.length > 0) {
        const decoded = jwt_decode(token);

        var user = new LocalUser();
        user.id = parseInt(decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
        user.userName = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        user.roles = decoded['Roles'];
        user.retailName = decoded['RetailName'];
        user.corporateName = decoded['CorporateName'];

        if (user.id > 0) this.mUser = user;
        return this.mUser;
      }
    } catch (e) {
      return null;
    }
  }

  async toggleLoader(value: boolean = false, message: string = null): Promise<void> {
    if (value) {
      if (this.loaderCount == 0) {
        this.loaderCount++;

        this.loader = await this.loadingController.create({
          backdropDismiss: false,
          spinner: "circles",
          message: message
        });

        return this.loader.present();
      } else {
        this.loaderCount++;
        return;
      }
    } else {
      this.loaderCount--;

      if (this.loaderCount == 0 && this.loader != null) {
        await this.loader.dismiss();
      }
      return;
    }
  }

  async showAlert(message: string, title: string = "Hata!") {
    const alert = await this.alertController.create({
      header: title,
      message,
      buttons: [
        {
          text: "Tamam",
          role: "cancel",
          handler: () => {
          },
        },
      ],
    });
    await alert.present();
  }

  async showErrorAlert(message: any) {

    if (Array.isArray(message)) {
      const errorDtos: ErrorDto[] = message;
      message = errorDtos.map(x => x.message).join(' ');
    }
    else if (message && message.title) {
      message.message = 'Sunucu erişiminde bir sorun oluştu';
    }

    if (message != null && message.message != null) {
      message = message.message;
    }

    await this.showToast(message, "top");
  }

  async showToast(
    message: string,
    position: "top" | "bottom" | "middle" = "top"
  ) {
    const toast = await this.toastController.create({
      message,
      position,
      duration: 3000,
    });
    toast.present();
  }
}

export class LocalUser {
  id?: number;
  userName?: string | undefined;
  retailName?: string | undefined;
  corporateName?: string | undefined;
  email?: string | undefined;
  phoneNumber?: string | undefined;
  password?: string | undefined;
  roles?: string | string[] | undefined;

  init(_data?: any) {
    if (_data) {
      this.id = _data['id'];
      this.userName = _data['userName'];
      this.retailName = _data['retailName'];
      this.corporateName = _data['corporateName'];
      this.phoneNumber = _data['phoneNumber'];
      this.password = _data['password'];
      this.email = _data['email'];
      this.roles = _data['roles'];
    }
  }

  static fromJS(data: any): LocalUser {
    data = typeof data === 'object' ? data : {};
    let result = new LocalUser();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['id'] = this.id;
    data['userName'] = this.userName;
    data['retailName'] = this.retailName;
    data['corporateName'] = this.corporateName;
    data['email'] = this.email;
    data['phoneNumber'] = this.phoneNumber;
    data['roles'] = this.roles;
    return data;
  }
}
