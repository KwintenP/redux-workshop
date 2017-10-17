import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {StarWarsCharacter} from '../../entities/star-wars-character.entity';

@Component({
  selector: 'app-search-character',
  template: `
    <div>
      <h3>Add character</h3>
      <img *ngIf="spinnerVisible" style="position:absolute;height:50px;left:200px;" src="assets/img/loading.gif">
    </div>
    <div>
      <input type="text" [formControl]="nameControl">
      <div class="searchResults">
        <ul>
          <li *ngFor="let character of data" (click)="itemSelected(character)">
            {{character.name}}
          </li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./search-character.component.scss']
})
export class SearchCharacterComponent implements OnInit {
  @Input() data;
  @Input() spinnerVisible = false;
  @Output() nameChanges = new EventEmitter<string>();
  @Output() itemSelect = new EventEmitter<string>();

  nameControl;

  constructor() {
    this.nameControl = new FormControl('');
  }

  ngOnInit() {
    this.nameControl.valueChanges
      .subscribe(this.nameChanges);
  }

  itemSelected(character) {
    this.nameControl.patchValue('');
    this.itemSelect.emit(character);
  }
}
