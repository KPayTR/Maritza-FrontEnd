import { Component, OnInit } from '@angular/core'; 

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit { 

  constructor( 
  ) {  
  }

  ngOnInit() {
  }
  updateUser(){
    
    // const model = new RegisterModel();
    // model.firstName = this.retailRegisterForm.get('firstName').value.trim(); 
  }
}
