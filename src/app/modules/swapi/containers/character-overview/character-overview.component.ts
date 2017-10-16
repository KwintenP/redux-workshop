import {Component, OnInit} from '@angular/core';
import {ApplicationState} from '../../../../statemanagement/root-reducer';
import {Store} from '@ngrx/store';
import {SwapiSandbox} from '../../sandboxes/swapi.sandbox';

@Component({
  selector: 'app-character-overview',
  template: `
    <table class="table">
      <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Gender</th>
        <th>Rating</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let character of characters$ | async; let i = index;">
        <th scope="row">{{i}}</th>
        <td>{{character.name}}</td>
        <td>{{character.gender}}</td>
        <td>{{character.rating}}</td>
        <td><i class="fa fa-trash-o" aria-hidden="true"></i></td>
      </tr>
      </tbody>
    </table>`,
})
export class CharacterOverviewComponent implements OnInit {
  characters$ = this.sandbox.characters$;

  constructor(private sandbox: SwapiSandbox) {
  }

  ngOnInit() {
  }

  removeCharacter(character) {
    this.sandbox.removeCharacter(character.id);
  }

  editCharacter() {
    //route
  }
}