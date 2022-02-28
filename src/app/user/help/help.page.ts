import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  boolVarlik:string="isi"

  constructor() { }

  ngOnInit() {
  }
  segmentChanged(temp) {
    this.boolVarlik = temp.detail.value;
  }
}
