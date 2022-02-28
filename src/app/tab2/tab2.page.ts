import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  boolVarlik = "isi";
  display = "0";
  calDisplay = "0";
  cur1 = "";
  cur2 = "";
  firstval: number = null;
  operator: any = null;
  newcursor = false;
  iscomma = false;
  currencyValue = 1;
  constructor() {}
  segmentChanged(temp) {
    this.boolVarlik = temp.detail.value;
  }
  public customFormatter(value: number) {
    console.log(`${value}%`) 
  }
  key(val) {
    switch (val) {
      case "x":
        this.display = "0";
        this.calDisplay = "0";
        this.iscomma = false;
        break;

      case "0":
        this.addnumber("0");
        break;
      case "1":
        this.addnumber("1");
        break;
      case "2":
        this.addnumber("2");
        break;
      case "3":
        this.addnumber("3");
        break;
      case "4":
        this.addnumber("4");
        break;
      case "5":
        this.addnumber("5");
        break;
      case "6":
        this.addnumber("6");
        break;
      case "7":
        this.addnumber("7");
        break;
      case "8":
        this.addnumber("8");
        break;
      case "9":
        this.addnumber("9");
        break;
      case ",":
        this.addcomma();
        break;
    }
  }
  addcomma() {
    if (this.iscomma === false) {
      this.iscomma = true;
    } else {
      this.iscomma = false;
    }
    console.log("comm ", this.iscomma);
  }
  addnumber(nbr: string) {
    if (nbr === "0") {
      if (this.newcursor === true) {
        this.display = nbr;
        this.newcursor = false;
      } else if (this.display !== "0") {
        if (this.iscomma === true) {
          this.display = `${this.display.toString()}.${nbr}`;
        } else {
          this.display = this.display.toString() + nbr;
        }
      } else if (this.display === "0") {
        if (this.iscomma === true) {
          this.display = `${this.display.toString()}.${nbr}`;
        }
      }
    } else {
      if (this.newcursor === true) {
        this.display = nbr;
        this.newcursor = false;
      } else if (this.display === "0") {
        if (this.iscomma === true) {
          if (this.display.toString().indexOf(".") > -1) {
            this.display = this.display.toString() + nbr;
          } else {
            this.display = `${this.display.toString()}.${nbr}`;
          }
        } else {
          this.display = nbr;
        }
      } else {
        if (this.iscomma === true) {
          console.log("comma", this.display);
          if (this.display.toString().indexOf(".") > -1) {
            this.display = this.display.toString() + nbr;
            console.log("comma if", this.display);
          } else {
            this.display = `${this.display.toString()}.${nbr}`;
            console.log("comma else", this.display);
          }
        } else {
          this.display = this.display.toString() + nbr;
        }
      }
    }
    this.calclast();
  }
  calclast() {
    console.log(this.iscomma);
    if (this.iscomma === true) {
      this.firstval = parseFloat(this.display);
    } else {
      this.firstval = parseInt(this.display, 0);
    }
    console.log(this.firstval);
    console.log(this.firstval);
    this.calDisplay = (this.firstval * this.currencyValue).toString();
    console.log(this.calDisplay);
  }
  selectChangeMain($event){

  }
  selectChange($event){
    
  }
}
