import {Component, OnInit} from '@angular/core';
import {SwapiSandbox} from '../../sandboxes/swapi.sandbox';
import {Router} from '@angular/router';
import {error, success} from 'toastr';
import {orderBy} from 'lodash-es';

@Component({
  selector: 'app-character-overview',
  styleUrls: ['./character-overview.component.scss'],
  template: `
    <h3>Your favourite characters</h3>
    <table class="table">
      <thead>
      <tr>
        <th>#</th>
        <th (click)="sortingRequested('name')">Name <i class="fa fa-sort" aria-hidden="true"></i></th>
        <th (click)="sortingRequested('gender')">Gender <i class="fa fa-sort" aria-hidden="true"></i></th>
        <th (click)="sortingRequested('rating')">Rating <i class="fa fa-sort" aria-hidden="true"></i></th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let character of sortedCharacters$ | async; let i = index;">
        <th scope="row">{{i}}</th>
        <td>{{character.name}}</td>
        <td>{{character.gender}}</td>
        <td>
          <app-rating [rating]="character.rating" (setRate)="rateUpdated(character, $event)"></app-rating>
        </td>
        <td>
          <i class="fa fa-trash-o" aria-hidden="true" (click)="removeCharacter(character)"></i>
          <i class="fa fa-pencil" aria-hidden="true" (click)="editCharacter(character)"></i>
        </td>
      </tr>
      </tbody>
    </table>`,
})
export class CharacterOverviewComponent implements OnInit {
  sortedCharacters$;

  constructor(private sandbox: SwapiSandbox,
              private router: Router) {
  }

  ngOnInit() {
    const sortCharacters = (characters, sorting) => sorting && sorting.columnName ?
      orderBy(characters, [sorting.columnName], [sorting.direction.toLowerCase()]) :
      characters;

    this.sortedCharacters$ = this.sandbox.characters$
      .combineLatest(this.sandbox.overviewSorting$, sortCharacters);
  }

  removeCharacter(character) {
    this.sandbox.removeCharacter(character.id)
      .catch(_ => error('removing character failed'))
      .subscribe(_ => success('character removed'));
  }

  rateUpdated(character, rating) {
    this.sandbox.updateRating(character.id, character, rating)
      .catch(_ => error('rate update failed'))
      .subscribe(_ => success('rate updated successfully'));
  }

  editCharacter(character) {
    this.router.navigate(['swapi', 'detail', character.id]);
  }

  sortingRequested(columName) {
    this.sandbox.sortingRequested(columName);
  }
}
