import {type} from '../util';
import {Action} from '@ngrx/store';
import {StarWarsCharacter} from '../../modules/swapi/entities/star-wars-character.entity';

export const ActionTypes = {
  SET_ALL_CHARACTERS: type('CONTAINER_LANGUAGE_SET') as 'CONTAINER_LANGUAGE_SET',
  REMOVE_CHARACTER: type('REMOVE_CHARACTER') as 'REMOVE_CHARACTER',
  EDIT_CHARACTER: type('EDIT_CHARACTER') as 'EDIT_CHARACTER',
  UPDATE_RATING: type('UPDATE_RATING') as 'UPDATE_RATING',
};

export class SetAllCharacters implements Action {
  readonly type = ActionTypes.SET_ALL_CHARACTERS;

  constructor(public payload: { characters: Array<StarWarsCharacter> }) {
  }
}

export class RemoveCharacter implements Action {
  readonly type = ActionTypes.REMOVE_CHARACTER;

  constructor(public payload: { id: string }) {
  }
}

export class EditCharacter implements Action {
  readonly type = ActionTypes.EDIT_CHARACTER;

  constructor(public payload: { id, character }) {
  }
}

export class UpdateRating implements Action {
  readonly type = ActionTypes.UPDATE_RATING;

  constructor(public payload: { id, rating }) {
  }
}

export type Actions = SetAllCharacters | RemoveCharacter | EditCharacter | UpdateRating;


export function characterReducer(state: Array<StarWarsCharacter> = [], action: Actions) {
  switch (action.type) {
    case ActionTypes.SET_ALL_CHARACTERS:
      return [...action.payload.characters];
    case ActionTypes.REMOVE_CHARACTER:
      return state.filter(character => action.payload.id !== character.id);
    case ActionTypes.EDIT_CHARACTER:
      return state.map(character => character.id === action.payload.id ? action.payload.character : character);
    case ActionTypes.UPDATE_RATING:
      return state.map(character => character.id === action.payload.id ?
        {...character, rating: action.payload.rating} : character);
    default:
      return state;
  }
}
