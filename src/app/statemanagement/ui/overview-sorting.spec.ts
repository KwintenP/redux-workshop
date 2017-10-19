import * as deepFreeze from 'deep-freeze';
import {overviewSortingReducer, SetSorting} from './overview-sorting';
import {init} from 'protractor/built/launcher';

describe('reducer overviewSortingReducer', () => {
  describe('case NGRX_INIT', () => {
    it('should return the initial state', () => {
    });
  });

  describe('case UNKNOWN_STATE', () => {
    it('should return the current state', () => {
    });
  });

  describe('on SET_SORTING', () => {
    it('should add the sorting and set the direction to ASC when there is no sorting yet', () => {
    });

    it('should add the sorting and set the direction to DESC when the current direction is ASC', () => {
    });

    it('should add the sorting and set the direction to ASC when the current direction is DESC', () => {
    });

    it('should override the sorting and set the direction to ASC when its a different columnName', () => {
    });
  });
});
