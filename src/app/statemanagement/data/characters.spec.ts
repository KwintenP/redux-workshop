import {
  AddCharacter, characterReducer, EditCharacter, RemoveCharacter, SetAllCharacters,
  UpdateRating
} from './characters';
import {StarWarsCharacter} from '../../modules/swapi/entities/star-wars-character.entity';
import * as deepFreeze from 'deep-freeze';

describe('reducer: charactersReducer', () => {
  describe('on NGRX_INIT', () => {
    it('should set the initial state', () => {

    });
  });

  describe('on UNKNOWN_STATE', () => {
    it('should return the current state', () => {
    });
  });

  describe('on SET_CHARACTERS', () => {
    it('should set the initial state', () => {
    });
  });

  describe('on REMOVE_CHARACTER', () => {
    it('should remove a character from the list', () => {
    });
  });

  describe('on UPDATE_RATING', () => {
    it('should update the rating of a character', () => {
    });
  });

  describe('on EDIT_CHARACTER', () => {
    it('should edit the character', () => {
    });
  });

  describe('on ADD_CHARACTER', () => {
    it('should add the character to the current list', () => {
    });
  });
});
