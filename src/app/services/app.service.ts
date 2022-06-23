import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ErrorDto } from './api-yatirimim.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  loaderCount = 0;
  loader: HTMLIonLoadingElement;


  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController,
  ) { }
  public get user(): User {
    try {
      const memberJson = localStorage.getItem("current_user");
      return User.fromJS(JSON.parse(memberJson));
    } catch (e) {
      return null;
    }
  }

  public set user(v: User) {
    localStorage.setItem("current_user", JSON.stringify(v.toJSON()));

  }

  get userPhone(): string {
    return localStorage.getItem("user_phone");
  }

  set userPhone(v: string) {
    localStorage.setItem("user_phone", v);
  }

  get userPass(): string {
    return localStorage.getItem("user_pass");
  }

  set userPass(v: string) {
    localStorage.setItem("user_pass", v);
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
    else if(message && message.title) {
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

export class User {
  public id: number | undefined;
  public phone: string | undefined;
  public pass: string | undefined;
  public token: string | undefined;
  public fcmToken: string | undefined;

  init(_data?: any) {
    if (_data) {
      this.id = _data["id"];
      this.phone = _data["phone"];
      this.pass = _data["pass"];
      this.token = _data["token"];
      this.fcmToken = _data["fcmToken"];
    }
  }

  static fromJS(data: any): User {
    data = typeof data === "object" ? data : {};
    let result = new User();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["id"] = this.id;
    data["phone"] = this.phone;
    data["pass"] = this.pass;
    data["token"] = this.token;
    data["fcmToken"] = this.fcmToken;
    return data;
  }
}