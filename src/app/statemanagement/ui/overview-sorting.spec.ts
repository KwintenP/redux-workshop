import * as deepFreeze from 'deep-freeze';
import {overviewSortingReducer, SetSorting} from './overview-sorting';
import {init} from 'protractor/built/launcher';

describe('reducer overviewSortingReducer', () => {
  describe('case NGRX_INIT', () => {
    it('should return the initial state', () => {
      const initialState = undefined;

      const result = overviewSortingReducer(initialState, {type: 'NGRX_INIT'} as any);

      expect(result).toEqual({});
    });
  });

  describe('case UNKNOWN_STATE', () => {
    it('should return the current state', () => {
      const initialState = {columnName: 'name', direction: 'ASC' as 'ASC'};
      deepFreeze(initialState);

      const result = overviewSortingReducer(initialState, {type: 'UNKNOWN_STATE'} as any);

      expect(result).toBe(initialState);
    });
  });

  describe('on SET_SORTING', () => {
      it('should add the sorting and set the direction to ASC when there is no sorting yet', () => {
        const initialState = {}
        deepFreeze(initialState);

        const result = overviewSortingReducer(initialState, new SetSorting({columnName: name}));

        expect(result).toEqual({columnName: name, direction: 'ASC'});
      });

    it('should add the sorting and set the direction to DESC when the current direction is ASC', () => {
      const initialState = {columnName: name, direction: 'ASC' as 'ASC'}
      deepFreeze(initialState);

      const result = overviewSortingReducer(initialState, new SetSorting({columnName: name}));

      expect(result).toEqual({columnName: name, direction: 'DESC'});
    });

    it('should add the sorting and set the direction to ASC when the current direction is DESC', () => {
      const initialState = {columnName: name, direction: 'DESC' as 'DESC'}
      deepFreeze(initialState);

      const result = overviewSortingReducer(initialState, new SetSorting({columnName: name}));

      expect(result).toEqual({columnName: name, direction: 'ASC'});
    });

    it('should override the sorting and set the direction to ASC when its a different columnName', () => {
      const initialState = {columnName: name, direction: 'DESC' as 'DESC'}
      deepFreeze(initialState);

      const result = overviewSortingReducer(initialState, new SetSorting({columnName: 'gender'}));

      expect(result).toEqual({columnName: 'gender', direction: 'ASC'});
    });
  });
});
