import { Component } from '@angular/core';
import { menuController } from "@ionic/core";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public yatirPages = [
    { title: "KREDİ KARTI İLE", url: "/transfer/deposit-credit-card", icon: "card-outline" },
    { title: "HAVALE / EFT", url: "/transfer/deposit-eft", icon: "library-outline" },
    { title: "FİZİKİ YATIR", url: "/transfer/deposit-pyhsical", icon: "server-outline" },
    { title: "KAYITLI KARTLARIM", url:  "/transfer/deposit-credit-card/choose-card", icon: "wallet-outline" },
  ];
  public cekPages = [
    { title: "HESABA ÇEKİM", url: "/transfer/withdraw-account", icon: "library-outline" },
    { title: "FİZİKİ ÇEKİM", url: "/transfer/withdraw-physical", icon: "server-outline" },
    { title: "BANKA HESAPLARIM", url: "/user/profile/bank-account", icon: "wallet-outline" },
  ];
  public islemPages = [
    { title: "İŞLEM GEÇMİŞİ", url: "/user/history", icon: "timer-outline" },
    { title: "İŞLEM LİMİTLERİM", url: "/user/transaction-limits", icon: "reader-outline" },
  ];
  public hesapPages = [
    { title: "KİMLİK DOĞRULAMA", url: "/auth/login", icon: "id-card-outline" },
    { title: "ŞİFRE DEĞİŞTİRME", url: "/user/password-change", icon: "key-outline" },
    {
      title: "KİŞİSEL BİLGİLERİM",
      url: "/user/profile",
      icon: "person-circle-outline",
    },
    { title: "BİLDİRİM AYARLARI", url: "/user/notifications/notification-setting", icon: "notifications-outline" },
    { title: "BLOG", url: "/tabs/home", icon: "create-outline" },

  ];
  public yardimPages = [
    { title: "YARDIM MERKEZİ", url: "/user/help", icon: "call-outline" },
    { title: "DİL SEÇENEĞİ", url: "/user/language", icon: "language-outline" },
    { title: "SÖZLEŞMELER", url: "/tabs/home", icon: "receipt-outline" },
    { title: "GÜVENLİK AYARLARI", url: "/user/security", icon: "shield-checkmark-outline" },
  ];

  constructor() {}
  async openMenu() {
    await menuController.open();
  }
}
