import {Injectable} from '@angular/core';
import {StarWarsBackendService} from '../services/star-wars-backend.service';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../statemanagement/root-reducer';
import {
  AddCharacter, EditCharacter, RemoveCharacter, SetAllCharacters,
  UpdateRating
} from '../../../statemanagement/data/characters';
import {StarWarsService} from '../services/star-wars.service';
import {LoadingDone, SetLoading} from '../../../statemanagement/ui/loading';
import {ResetStore} from '../../../statemanagement/metareducers/reset.reducer';
import {SetSorting} from '../../../statemanagement/ui/overview-sorting';

@Injectable()
export class SwapiSandbox {
  characters$ = this.store.select((state: ApplicationState) => state.data.characters);
  loading$ = this.store.select((state: ApplicationState) => state.ui.loading);
  overviewSorting$ = this.store.select((state: ApplicationState) => state.ui.overviewSorting);

  constructor(
    private store: Store<ApplicationState>,
    private starwarsBackendService: StarWarsBackendService,
    private starwarsService: StarWarsService) {
    this.getAllCharacters();
  }

  getCharacters(page: number, searchTerm?) {
    return this.starwarsService.getCharacters(page, searchTerm);
  }

  getAllCharacters() {
    this.starwarsBackendService.getAllCharacters()
      .subscribe((characters) => this.store.dispatch(new SetAllCharacters({characters})));
  }

  getCharacter(id) {
    return this.starwarsBackendService.getCharacter(id);
  }

  addCharacter(character) {
    // set default rating to 1
    character.rating = 1;
    return this.starwarsBackendService.addCharacter(character)
      .map(result => this.store.dispatch(new AddCharacter({character: result})));
  }

  editCharacter(id, character) {
    return this.starwarsBackendService.editCharacter(id, character)
      .map(updatedCharacter => this.store.dispatch(new EditCharacter({id, character: updatedCharacter})));
  }

  updateRating(id, character, rating) {
    return this.starwarsBackendService.editCharacter(id, {...character, rating})
      .map(_ => this.store.dispatch(new UpdateRating({id, rating})));
  }

  removeCharacter(id) {
    return this.starwarsBackendService.deleteCharacter(id)
      .map(_ => this.store.dispatch(new RemoveCharacter({id})));
  }

  setLoading() {
    this.store.dispatch(new SetLoading());
  }

  loadingDone() {
    this.store.dispatch(new LoadingDone());
  }

  loadData() {
    this.store.dispatch(new ResetStore());
    this.getAllCharacters();
  }

  sortingRequested(columnName) {
    this.store.dispatch(new SetSorting({columnName}));
  }
}
