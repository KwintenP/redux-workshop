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

  constructor(private store: Store<ApplicationState>,
              private starWarsBackendService: StarWarsBackendService,
              private router: Router) {
  }

  ngOnInit() {
    const sortCharacters = (characters, sorting) => sorting && sorting.columnName ?
      orderBy(characters, [sorting.columnName], [sorting.direction.toLowerCase()]) :
      characters;

    this.sortedCharacters$ = this.store.select(state => state.data.characters)
      .combineLatest(this.store.select(state => state.ui.overviewSorting), sortCharacters);
  }

  removeCharacter(character) {
    return this.starWarsBackendService.deleteCharacter(character.id)
      .map(_ => this.store.dispatch(new RemoveCharacter({id: character.id})))
      .catch(_ => error('removing character failed'))
      .subscribe(_ => success('character removed'));
  }

  rateUpdated(character, rating) {
    this.starWarsBackendService.editCharacter(character.id, {...character, rating})
      .map(_ => this.store.dispatch(new UpdateRating({id: character.id, rating})))
      .catch(_ => error('rate update failed'))
      .subscribe(_ => success('rate updated successfully'));
  }

  editCharacter(character) {
    this.router.navigate(['swapi', 'detail', character.id]);
  }

  sortingRequested(columnName) {
    this.store.dispatch(new SetSorting({columnName}));
  }
}
