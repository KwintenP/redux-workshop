import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-search-character',
  template: `
    <input type="text" [formControl]="nameControl"/>
  `,
  styleUrls: ['./search-character.component.scss']
})
export class SearchCharacterComponent implements OnInit {
  @Output() nameChanges = new EventEmitter<string>();

  nameControl;

  constructor() {
    this.nameControl = new FormControl('');
  }

  ngOnInit() {
    this.nameControl.valueChanges
      .subscribe(this.nameChanges);
  }
}
