import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular"; 
import { PrivacyPolicyComponent } from "src/app/components/privacy-policy/privacy-policy.component";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  retail: boolean = false;
  isUserAgreementAccepted: boolean = false;
  isPrivacyAgreementAccepted: boolean = false;
  isContactAgreementAccepted: boolean = false;
  step: number = 1;

  retailRegisterForm: FormGroup;
  corporateRegisterForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController
  ) {
    this.retailRegisterForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      identityNo: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    })

    this.corporateRegisterForm = this.formBuilder.group({
      firmName: ['', [Validators.required, Validators.minLength(2)]],
      taxOffice: ['', [Validators.required, Validators.minLength(2)]],
      taxNo: ['', [Validators.required, Validators.minLength(2)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  ngOnInit() {
    this.step = 1;
  }
  step2() {
    this.step++;
  }
  
  async privacyModal() {
    const modal = await this.modalController.create({
      component: PrivacyPolicyComponent,
      cssClass: "my-custom-class",
    });

    return await modal.present();
  }

  registerRetail() {

  }

  registerCorporate() {

  }
}
