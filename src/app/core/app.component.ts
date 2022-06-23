import { Component } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { AppService } from '../services/app.service';
import { MarketDataService } from '../services/market-data.service';
import { MarketSymbolsService } from '../services/market-symbols.service';
import { TokenRefreshService } from '../services/token-refresh.service';

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
  isCopied = false;

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
      id: 5,
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
    public appService: AppService,
    private menu: MenuController,
   // private coreService: MarketDataService,
    private coreService: MarketSymbolsService,
    private tokenService: TokenRefreshService

  ) {
    moment.locale('tr')
    this.coreService.init() 
    console.log('tok tok',this.appService.accessToken )
    if (this.appService.accessToken) {
      
    }
    this.initTheme();
  }
  
  openEnd() {
    this.menu.close();
  }
  
  openSegment(menuId) {
    this.activeSideMenuId = menuId;
    console.log(menuId)
  }

  initTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    if(this.appService.userTheme == 'dark' || prefersDark.matches) {
      this.appService.userTheme = 'dark';
      document.body.classList.add('dark');
      document.body.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark-app');
    }
    else {
      this.appService.userTheme = 'light';
      document.body.classList.remove('dark');
      document.body.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark-app');
    }
  }

  toggleTheme() {
    if(this.appService.userTheme == 'light') {
      this.appService.userTheme = 'dark';
      document.body.classList.add('dark');
      document.body.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark-app');
    }
    else {
      this.appService.userTheme = 'light';
      document.body.classList.remove('dark');
      document.body.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark-app');
    }
  }

  async copyUserId() {
    await Clipboard.write({
      string: this.appService.user.id.toString()
    });
    this.isCopied = true;

    setTimeout(() => {
      this.isCopied = false;
    }, 2000);
  }
}
