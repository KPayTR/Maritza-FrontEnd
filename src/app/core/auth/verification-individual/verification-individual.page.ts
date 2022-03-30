import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verification-individual',
  templateUrl: './verification-individual.page.html',
  styleUrls: ['./verification-individual.page.scss'],
})
export class VerificationIndividualPage implements OnInit {

  myGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,

  ) {
    this.myGroup = this.formBuilder.group({
      idfront: ['', [Validators.required, Validators.minLength(2)]],
      idback: ['', [Validators.required, Validators.minLength(2)]], 
      residence: ['', [Validators.required, Validators.minLength(2)]], 
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
