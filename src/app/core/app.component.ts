import { Component } from '@angular/core';

interface SideMenuItem {
  title: string;
  icon: string;
  url: string;
}
interface SideMenu {
  id: number;
  header: string;
  collapsable: boolean;
  items: SideMenuItem[];
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  activeSideMenuId = 1;

  menuItems: SideMenu[] = [
    {
      id: 1,
      header: 'YATIR',
      collapsable: true,
      items: [
        { title: "KREDİ KARTI İLE", url: "app/transfer/deposit-credit-card", icon: "card" },
        { title: "HAVALE / EFT", url: "app/transfer/deposit-eft", icon: "library" },
        { title: "FİZİKİ YATIR", url: "app/transfer/deposit-pyhsical", icon: "server" },
        { title: "KAYITLI KARTLARIM", url: "app/transfer/deposit-credit-card/choose-card", icon: "wallet" },
      ]
    },
    {
      id: 2,
      header: 'ÇEK',
      collapsable: true,
      items: [
        { title: "HESABA ÇEKİM", url: "app/transfer/withdraw-account", icon: "library" },
        { title: "FİZİKİ ÇEKİM", url: "app/transfer/withdraw-pyhsical", icon: "server" },
        { title: "BANKA HESAPLARIM", url: "user/profile/bank-account", icon: "wallet" },
      ]
    },
    {
      id: 3,
      header: 'İŞLEMLER',
      collapsable: true,
      items: [
        { title: "İŞLEM GEÇMİŞİ", url: "user/history", icon: "timer" },
        { title: "İŞLEM LİMİTLERİM", url: "user/transaction-limits", icon: "reader" },
      ]
    },
    {
      id: 4,
      header: 'HESABIM',
      collapsable: true,
      items: [
        { title: "KİMLİK DOĞRULAMA", url: "auth/login", icon: "id-card" },
        { title: "ŞİFRE DEĞİŞTİRME", url: "user/password-change", icon: "key" },
        { title: "KİŞİSEL BİLGİLERİM", url: "user/profile", icon: "person-circle" },
        { title: "BİLDİRİM AYARLARI", url: "user/notifications/notification-setting", icon: "notifications" },
        { title: "BLOG", url: "/tabs/home", icon: "create" },
      ]
    },
    {
      id:5,
      header: 'YARDIM',
      collapsable: true,
      items: [
        { title: "YARDIM MERKEZİ", url: "user/help", icon: "call" },
        { title: "DİL SEÇENEĞİ", url: "user/language", icon: "language" },
        { title: "SÖZLEŞMELER", url: "/tabs/home", icon: "receipt" },
        { title: "GÜVENLİK AYARLARI", url: "user/security", icon: "shield-checkmark" },
      ]
    },
    {
      id: 6,
      header: '',
      collapsable: false,
      items: [
        { title: "ÇIKIŞ YAP", url: "/auth", icon: "exit" },
      ]
    }
  ]

  constructor() { }

  openSegment(menuId) {
    this.activeSideMenuId = menuId;
    console.log(menuId)
  }
}
