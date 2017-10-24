import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {error, success} from 'toastr';
import {orderBy} from 'lodash-es';
import {ApplicationState} from '../../../../statemanagement/root-reducer';
import {Store} from '@ngrx/store';
import {StarWarsBackendService} from '../../services/star-wars-backend.service';
import {RemoveCharacter, UpdateRating} from '../../../../statemanagement/data/characters';
import {SetSorting} from '../../../../statemanagement/ui/overview-sorting';

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

  constructor(
              private starWarsBackendService: StarWarsBackendService,
              private router: Router) {
  }

  ngOnInit() {
    const sortCharacters = (characters, sorting) => sorting && sorting.columnName ?
      orderBy(characters, [sorting.columnName], [sorting.direction.toLowerCase()]) :
      characters;

    // this.sortedCharacters$; // TODO: select the characters and the sorting from the store
    // and use the 'sortCharacters' function to do the sorting
  }

  removeCharacter(character) {
    // TODO: delete the character and update the store. show toastr on success and error
  }

  rateUpdated(character, rating) {
    // TODO: update the character and update the store. show toastr on success and error
  }

  editCharacter(character) {
    this.router.navigate(['swapi', 'detail', character.id]);
  }

  sortingRequested(columnName) {
    // TODO: update the sorting in the store
  }
}
