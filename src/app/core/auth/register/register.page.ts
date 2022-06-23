import { Component, NgZone, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from "@angular/router";
import { ModalController } from "@ionic/angular"; 
import { PrivacyPolicyComponent } from "src/app/components/privacy-policy/privacy-policy.component";
import { ApiService, LanguageEnum, MemberCreateDTO, MemberDTO, MemberTypeEnum } from "src/app/services/api-hkn-yatirimim.service";
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
  isValidMail?:  boolean | null;
  isValidPhone ?: boolean| null;
  isValidId ?: boolean| null;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private zone: NgZone,
    private router:Router,
    private appService:AppService,
    private authService:AuthApiService,
    private modalController: ModalController,
    private apiHknService : ApiService
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
      phone: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    })
  }

  ngOnInit() {
    this.step = 1;
  }
  step2() {
    this.step++;
  }
  registerRetail(){
     
    const mo = new MemberCreateDTO();
    mo.memberType=MemberTypeEnum.Personal;
    mo.firstName=this.retailRegisterForm.get('firstName').value.trim();
    mo.lastName = this.retailRegisterForm.get('lastName').value.trim();
    mo.gSMNo = "90"+this.retailRegisterForm.get('phone').value.replace(/[\])}[{(]/g, '').replace(/\s/g, "");
    mo.email = this.retailRegisterForm.get('email').value.trim();
    mo.password= this.retailRegisterForm.get('password').value.trim();
    mo.selectedLanguage=LanguageEnum.TR;
    mo.hasAcceptedEUA=this.isUserAgreementAccepted;
    mo.hasAcceptedSUPDA =this.isPrivacyAgreementAccepted;
    mo.hasAcceptedNotifications= this.isContactAgreementAccepted;
    mo.tCKN=this.retailRegisterForm.get('identityNo').value.trim();
    // mo.officialName=""
    // mo.taxOffice=""
    // mo.taxNumber=""
    // mo.mERSISNo=""

    // const model = new RegisterModel();
    // model.firstName = this.retailRegisterForm.get('firstName').value.trim();
    // model.lastName = this.retailRegisterForm.get('lastName').value.trim();
    // model.identityNo=this.retailRegisterForm.get('identityNo').value.trim();
    // model.email = this.retailRegisterForm.get('email').value.trim();
    // model.phoneNumber = this.retailRegisterForm.get('phone').value.trim();
    // model.password= this.retailRegisterForm.get('password').value.trim();
    // model.isAcceptContact=this.isUserAgreementAccepted;
    // model.isAcceptKvk= this.isPrivacyAgreementAccepted;
    // model.isAcceptTerms= this.isContactAgreementAccepted;
    // model.isCorporate=false;
    console.log("mo ",mo)
    this.appService.toggleLoader(true).then((res) => {
      this.apiHknService.memberPost(mo)
      .subscribe(
        v => this.onRegister(v, mo.gSMNo,mo.password),
        e => this.onError(e)
      )
     
      // this.authService.register(model)
      // .subscribe(
      //     v => this.onRegister(v, model.phoneNumber),
      //     e => this.onError(e)
      // )
       
        });
  } 
  onRegister(v: MemberDTO, phone,pass): void {
    this.zone.run(() => {
      this.appService.toggleLoader(false);
     // this.appService.accessToken = v.rID.toString(); 
      this.appService.userPhone=  phone;
      this.appService.userPass=  pass;
      console.log(v);
      this.router.navigate(['/auth/login-approve'])
    });
  }
  onError(e: any): void {
    console.log("erro ",e)

    this.zone.run(() => {
      this.appService.toggleLoader(false); 
      this.appService.showErrorAlert(e);
    });
  }
  registerCorporate(){
    const mo = new MemberCreateDTO();
    mo.memberType=MemberTypeEnum.Corporate;
    mo.firstName=this.corporateRegisterForm.get('firstName').value.trim();
    mo.gSMNo = "90"+this.corporateRegisterForm.get('phone').value.replace(/[\])}[{(]/g, '').replace(/\s/g, "");
    mo.email = this.corporateRegisterForm.get('email').value.trim();
    mo.password= this.corporateRegisterForm.get('password').value.trim();
    mo.selectedLanguage=LanguageEnum.TR;
    mo.hasAcceptedEUA=this.isUserAgreementAccepted;
    mo.hasAcceptedSUPDA =this.isPrivacyAgreementAccepted;
    mo.hasAcceptedNotifications= this.isContactAgreementAccepted;
    mo.officialName=this.corporateRegisterForm.get('firmName').value.trim();
    mo.taxOffice= this.corporateRegisterForm.get('taxOffice').value.trim();
    mo.taxNumber= this.corporateRegisterForm.get('taxNo').value.trim(); 
    mo.lastName=this.corporateRegisterForm.get('lastName').value.trim();
    mo.mERSISNo="8309017269714575"
   
    // const model = new RegisterModel();
    // model.corporateName= this.corporateRegisterForm.get('firmName').value.trim();
    // model.taxOffice= this.corporateRegisterForm.get('taxOffice').value.trim();
    // model.taxNumber= this.corporateRegisterForm.get('taxNo').value.trim();
    // model.firstName = this.corporateRegisterForm.get('firstName').value.trim();
    // model.lastName = this.corporateRegisterForm.get('lastName').value.trim(); 
    // model.email = this.corporateRegisterForm.get('email').value.trim();
    // model.phoneNumber = this.corporateRegisterForm.get('phone').value.trim();
    // model.password= this.corporateRegisterForm.get('password').value.trim();
    // model.isAcceptContact=this.isUserAgreementAccepted;
    // model.isAcceptKvk= this.isPrivacyAgreementAccepted;
    // model.isAcceptTerms= this.isContactAgreementAccepted;
    // model.isCorporate=true;

    this.appService.toggleLoader(true).then((res) => {
      this.apiHknService.memberPost(mo)
      .subscribe(
          v => this.onRegister(v,mo.gSMNo,mo.password),
          e => this.onError(e)
      )
       
        });
    //this.router.navigate(['/auth/verification-corporate'])
  }
  async privacyModal() {
    const modal = await this.modalController.create({
      component: PrivacyPolicyComponent,
      cssClass: "my-custom-class",
    });

    return await modal.present();
  }
  onBlurPhone(){  
    // let phone=""
    // if (this.retail) {
    // phone = this.retailRegisterForm.get('phone').value.replace(/\s/g, ""); 
    // } 
    // else{
    // phone = this.corporateRegisterForm.get('phone').value.replace(/\s/g, ""); 
    // }
    // this.authService.checkphonenumber(phone).subscribe(
    //   v => this.isValidPhone=true,
    //   e => this.isValidPhone=false
    // )
  } 
  onClearPhone(){ 
   // this.isValidPhone=null
  } 
  onCheckId(event){
    // let id= event.detail.value; 
    // this.isValidId=null;
    
    // if (String(id).length==11) {
    //   this.authService.checkidentityno(id).subscribe(
    //     v => {this.isValidId=true},
    //     e => {this.isValidId=false}
    //   ) 
    // } else {
    //   this.isValidMail=null
      
    // }
    
     
  }
  onCheckEmail(event){
    // this.isValidMail=null;
    // let mail= event.detail.value;
    // const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // if (regexp.test(mail)) {
    //   this.authService.checkemail(mail).subscribe(
    //     v => {this.isValidMail=true},
    //     e => {this.isValidMail=false}
    //   ) 
    // }
    // else{
    //   this.isValidMail=null
    // }
   
  }
}
