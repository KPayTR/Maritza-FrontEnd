import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-verification-corporate',
  templateUrl: './verification-corporate.page.html',
  styleUrls: ['./verification-corporate.page.scss'],
})
export class VerificationCorporatePage implements OnInit {
  verificationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,

  ) {
    this.verificationForm = this.formBuilder.group({
      signature: ['', [Validators.required, Validators.minLength(2)]],
      tax: ['', [Validators.required, Validators.minLength(2)]], 
      news: ['', [Validators.required, Validators.minLength(2)]],
      activity: ['', [Validators.required, Validators.minLength(2)]], 
    })
   }

  ngOnInit() {
  }

  registerRetail() {

  }
  chooseSignature(){

  }
  chooseTax(){
    
  }
}
