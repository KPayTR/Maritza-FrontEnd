import { Component, NgZone, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular"; 

@Component({
  selector: "app-privacy-policy",
  templateUrl: "./privacy-policy.component.html",
  styleUrls: ["./privacy-policy.component.scss"],
})
export class PrivacyPolicyComponent implements OnInit {
  policy: string = "";

  constructor(
    // private commonApiService: CommonApiService,
    // private appService: AppService,
    private modalController: ModalController,
    private zone: NgZone
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.getPolicy();
    }, 100);
  }

  getPolicy() {
    // this.appService.toggleLoader(true).then(res => {
    //     this.commonApiService.privacypolicy().subscribe(
    //         v => this.onPrivacyPolicy(v),
    //         e => this.onError(e)
    //     )
    // })
  }

  onPrivacyPolicy(v: any) {
    // this.zone.run(() => {
    //     this.appService.toggleLoader(false)
    //     this.policy = v.value
    // })
  }

  onError(e: any) {
    // this.zone.run(() => {
    //     this.appService.toggleLoader(false)
    //     this.appService.showErrorAlert(e)
    // })
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
