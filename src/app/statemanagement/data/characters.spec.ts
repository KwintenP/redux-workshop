import {characterReducer, EditCharacter, RemoveCharacter, SetAllCharacters, UpdateRating} from './characters';
import {StarWarsCharacter} from '../../modules/swapi/entities/star-wars-character.entity';
import * as deepFreeze from 'deep-freeze';

describe('reducer: charactersReducer', () => {
  describe('on NGRX_INIT', () => {
    it('should set the initial state', () => {
      const initialState = undefined;

      const result = characterReducer(initialState, {type: 'NGRX_INIT'} as any);

      expect(result).toEqual([]);
    });
  });

  describe('on UNKNOWN_STATE', () => {
    it('should return the current state', () => {
      const initialState = [{id: '1', name: 'Luke SkyWalker'}];
      deepFreeze(initialState);

      const result = characterReducer(initialState, {type: 'NGRX_INIT'} as any);

      expect(result).toEqual(initialState);
    });
  });

  describe('on SET_CHARACTERS', () => {
    it('should set the initial state', () => {
      const initialState = [{} as StarWarsCharacter];
      deepFreeze(initialState);

      const payload: Array<StarWarsCharacter> = [{id: '1', name: 'Luke SkyWalker'}];

      const result = characterReducer(initialState, new SetAllCharacters({characters: payload}));

      expect(result).toEqual(payload);
    });
  });

  describe('on REMOVE_CHARACTER', () => {
    it('should remove a character from the list', () => {
      const luke = {id: '1', name: 'Luke SkyWalker'};
      const initialState = [luke, {id: '2', name: 'R2D2'}];
      deepFreeze(initialState);

      const result = characterReducer(initialState, new RemoveCharacter({id: '2'}));

      expect(result.length).toBe(1);
      expect(result[0]).toBe(luke);
    });
  });

  describe('on UPDATE_RATING', () => {
    it('should update the rating of a character', () => {
      const luke = {id: '1', name: 'Luke SkyWalker', rating: 5};
      const initialState = [luke];
      deepFreeze(initialState);

      const result = characterReducer(initialState, new UpdateRating({id: '1', rating: 3}));

      expect(result.length).toBe(1);
      expect(result[0]).not.toBe(luke);
      expect(result[0].rating).toBe(3);
    });
  });

  describe('on EDIT_CHARACTER', () => {
    it('should edit the character', () => {
      const luke = {id: '1', name: 'Luke SkyWalker', rating: 5};
      const initialState = [luke];
      deepFreeze(initialState);


      const updatedCharacter = {
        name: 'SkyWalker Luke',
        rating: 2
      };
      const result = characterReducer(initialState, new EditCharacter({id: '1', character: updatedCharacter}));

      expect(result.length).toBe(1);
      expect(result[0]).toBe(updatedCharacter);
      expect(result[0].rating).toBe(2);
    });
  });
});
