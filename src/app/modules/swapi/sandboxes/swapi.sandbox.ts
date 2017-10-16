import {Injectable} from '@angular/core';
import {StarWarsBackendService} from '../services/star-wars-backend.service';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../statemanagement/root-reducer';
import {
  AddCharacter, EditCharacter, RemoveCharacter, SetAllCharacters,
  UpdateRating
} from '../../../statemanagement/data/characters';
import {StarWarsService} from '../services/star-wars.service';

@Injectable()
export class SwapiSandbox {
  characters$ = this.store.select((state: ApplicationState) => state.characters);

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

  addCharacter(character) {
    // set default rating to 1
    character.rating = 1;
    return this.starwarsBackendService.addCharacter(character)
      .map(result => this.store.dispatch(new AddCharacter({character: result})));
  }

  editCharacter(id, character) {
    return this.starwarsBackendService.editCharacter(id, character)
      .map(_ => this.store.dispatch(new EditCharacter({id, character})));
  }

  updateRating(id, character, rating) {
    return this.starwarsBackendService.editCharacter(id, {...character, rating})
      .map(_ => this.store.dispatch(new UpdateRating({id, rating})));
  }

  removeCharacter(id) {
    return this.starwarsBackendService.deleteCharacter(id)
      .map(_ => this.store.dispatch(new RemoveCharacter({id})));
  }
}
