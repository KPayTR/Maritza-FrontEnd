import { Component, NgZone, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from "@angular/router";
import { ModalController } from "@ionic/angular"; 
import { PrivacyPolicyComponent } from "src/app/components/privacy-policy/privacy-policy.component";
import { AuthApiService, RegisterModel, TokenModel } from "src/app/services/api-yatirimim.service";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  retail: boolean = true;
  isUserAgreementAccepted: boolean = false;
  isPrivacyAgreementAccepted: boolean = false;
  isContactAgreementAccepted: boolean = false;
  step: number = 1; 
  id=''

  retailRegisterForm: FormGroup;
  corporateRegisterForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private zone: NgZone,
    private router:Router,
    private appService:AppService,
    private authService:AuthApiService,
    private modalController: ModalController
  ) {
    console.log('the id', this.route.snapshot.paramMap.get('id')); 
    this.id=this.route.snapshot.paramMap.get('id');
    if (this.id=='1') {
      this.retail= true;


    } else {
      this.retail= false;

    }

    this.retailRegisterForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      identityNo: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.minLength(2)]],
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
  registerIndividual(){
    const model = new RegisterModel();
    model.firstName = this.retailRegisterForm.get('firstName').value.trim();
    model.lastName = this.retailRegisterForm.get('lastName').value.trim();
    model.email = this.retailRegisterForm.get('email').value.trim();
    model.phoneNumber = this.retailRegisterForm.get('phone').value.trim();
    model.password= this.retailRegisterForm.get('password').value.trim();
    model.isAcceptContact=this.isUserAgreementAccepted;
    model.isAcceptKvk= this.isPrivacyAgreementAccepted;
    model.isAcceptTerms= this.isContactAgreementAccepted;
    model.isCorporate=false;

    this.appService.toggleLoader(true).then((res) => {
    this.authService.register(model)
        .subscribe(
            v => this.onRegister(v),
            e => this.onError(e)
        )

        });
  }
  onRegister(v: TokenModel): void {
    this.zone.run(() => {
      this.appService.toggleLoader(false);
      this.appService.accessToken = v.token;
      console.log(v);
    this.router.navigate(['/auth/verification-individual'])
    });
  }
  onError(e: any): void {
    this.zone.run(() => {
      this.appService.toggleLoader(false);
      this.appService.showErrorAlert(e);
    });
  }
  registerCorporate(){
    this.router.navigate(['/auth/verification-corporate'])
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
 
}
