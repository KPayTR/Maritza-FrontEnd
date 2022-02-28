import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.page.html',
  styleUrls: ['./password-change.page.scss'],
})
export class PasswordChangePage implements OnInit {
  passwordForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required, Validators.minLength(2)]],
      newPassword: ['', [Validators.required, Validators.minLength(2)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(2)]],
    })
   }
   registerRetail(){
     
   }
  ngOnInit() {
  }

}
