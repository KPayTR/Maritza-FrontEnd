import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saved-card',
  templateUrl: './saved-card.page.html',
  styleUrls: ['./saved-card.page.scss'],
})
export class SavedCardPage implements OnInit {
  selectedItem:boolean= false;
  constructor() { }

  ngOnInit() {
  }
  selected(e){
    this.selectedItem=true;
    console.log(e)
  }
}
