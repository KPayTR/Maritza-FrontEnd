import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {
   num:number;
   res:number;
  constructor() { }

  ngOnInit() {
  }
  calc(){
    console.log("s")
    console.log(this.num)
    console.log(this.res)
    this.res=this.num;
  }
  selectChangeMain(e){}
}
