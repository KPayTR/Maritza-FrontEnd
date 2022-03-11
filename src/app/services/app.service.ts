import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }
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
}

export class User {
  public phone: string | undefined;
  public pass: string | undefined; 
  public token: string | undefined; 
  public fcmToken: string | undefined;  

  init(_data?: any) {
    if (_data) {
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
    data["phone"] = this.phone;
    data["pass"] = this.pass; 
    data["token"] = this.token;
    data["fcmToken"] = this.fcmToken;  
    return data;
  }
}