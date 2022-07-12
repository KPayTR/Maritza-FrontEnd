import { Component, OnInit } from '@angular/core';
import { AssetModel, AssetsApiService, CommissionApiService, CommissionModel, CommissionType, SymbolModel } from 'src/app/services/api-yatirimim.service';
import { AppService } from 'src/app/services/app.service';
import { MarketDataService } from 'src/app/services/market-data.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.page.html',
  styleUrls: ['./buy.page.scss'],
})
export class BuyPage implements OnInit {
  userAssets: AssetModel[];
  tlAsset: AssetModel;

  targetSymbolId: number;
  tradeableSymbols: SymbolModel[];
  commission: CommissionModel;

  commissionAmount: number = 0;
  transactionAmount: number = 0;
  totalAmount: number = 0;
  maxAmount: number = 0;

  constructor(
    private appService: AppService,
    private assetsApiService: AssetsApiService,
    private commisionApiService: CommissionApiService,
    private marketDataService: MarketDataService
  ) { }

  ngOnInit() {
    this.totalAmount = 0;

    this.tradeableSymbols = this.marketDataService.symbols.filter(x => x.isTradeable && !x.isMainCurrency);
    let selectedItem = this.tradeableSymbols.find(x => x.matriksCode == 'GLDGR');
    if (selectedItem == null) selectedItem = this.tradeableSymbols[0];
    this.targetSymbolId = selectedItem.id;


    this.appService.toggleLoader(true).then(() => {
      this.assetsApiService.getwallet()
        .subscribe(
          v => this.onWallet(v),
          e => {
            this.appService.toggleLoader(false);
            this.appService.showErrorAlert(e)
          }
        )
    })
  }

  loadCommissions() {
    this.commisionApiService.getlist()
        .subscribe(
          v => this.onCommissions(v),
          e => {
            this.appService.showErrorAlert(e)
          }
        )
  }

  onCommissions(v: CommissionModel[]): void {
    this.commission = v.find(x => x.commissionType == CommissionType.Buy && x.symbolId == this.targetSymbolId);
    this.maxAmount = this.tlAsset.price ;
  }

  onWallet(v: AssetModel[]): void {
    this.loadCommissions();
    this.appService.toggleLoader(false);
    this.userAssets = v;
    this.tlAsset = v.find(x => x.symbol.isMainCurrency);
    console.log(this.tlAsset)
  }

  getSymbolRate(symbolId) {
    return this.marketDataService.symbolRates.find(x => x.symbolId == symbolId);
  }

  changeCurrency(e) {
    if (e == "25") {
      this.totalAmount = this.tlAsset.price * 0.25
    }
    else if (e == "50") {
      this.totalAmount = this.tlAsset.price * 0.5
    }
    else if (e == "75") {
      this.totalAmount = this.tlAsset.price * 0.75
    }
    else {
      this.totalAmount = this.tlAsset.price
    }

    this.calculateAmounts();
  }

  calculateAmounts() {
    if(this.totalAmount > this.maxAmount) {
      this.totalAmount = this.maxAmount;
    }

    this.commissionAmount = this.getCommissionAmount(this.totalAmount);
    this.transactionAmount = this.totalAmount  - this.commissionAmount;
  }

  getCommissionAmount(amount: number) {
    let commissionAmountTemp = 0;

    if(this.commission) {
      if(this.commission.commissionRate > 0) {
        commissionAmountTemp = amount * this.commission.commissionRate / 100;
      }
      else if(this.commission.commissionValue > 0) {
        commissionAmountTemp = this.commission.commissionValue;
      }
    }

    return commissionAmountTemp;
  }
}
