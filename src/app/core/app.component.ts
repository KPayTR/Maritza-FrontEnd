import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import * as moment from 'moment';
import { MarketDataService } from '../services/market-data.service'; 

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
        { title: "KREDİ KARTI İLE", url: "transfer/deposit-credit-card", icon: "card" },
        { title: "HAVALE / EFT", url: "transfer/deposit-eft", icon: "library" },
        { title: "FİZİKİ YATIR", url: "transfer/deposit-pyhsical", icon: "server" },
        { title: "KAYITLI KARTLARIM", url: "transfer/deposit-credit-card/choose-card", icon: "wallet" },
      ]
    },
    {
      id: 2,
      header: 'ÇEK',
      collapsable: true,
      items: [
        { title: "HESABA ÇEKİM", url: "transfer/withdraw-account", icon: "library" },
        { title: "FİZİKİ ÇEKİM", url: "transfer/withdraw-pyhsical", icon: "server" },
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
        { title: "ÇIKIŞ YAP", url: "/auth/login", icon: "exit" },
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
      header: 'QR ÖDEME & KAMPANYALAR',
      collapsable: false,
      items: [ 
        { title: "QR ÖDEME YAP", url: " ", icon: "qr-code" },
        { title: "KAMPANYALAR", url: " ", icon: "gift" },
      ]
    },
    {
      id: 7,
      header: 'ARKADAŞINI DAVET ET',
      collapsable: false,
      items: [ 
        { title: "DAVET LİNKİ", url: " ", icon: "share-social" }, 
      ]
    }
  ]

  constructor(
    private menu: MenuController,
    private coreService : MarketDataService

  ) {
    moment.locale('tr')
    this.coreService.init()
   }
   openEnd() {  
    this.menu.close();
    }
  openSegment(menuId) {
    this.activeSideMenuId = menuId;
    console.log(menuId)
  }
}
