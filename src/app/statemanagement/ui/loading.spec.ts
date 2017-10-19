import {LoadingDone, loadingReducer, SetLoading} from './loading';
import * as deepFreeze from 'deep-freeze';
import {init} from 'protractor/built/launcher';

describe('reducer: loading reducer', () => {
  describe('case NGRX_INIT', () => {
    it('should return the initial state', () => {
      const initialState = undefined;

      const result = loadingReducer(initialState, {type: 'NGRX_INIT'} as any);

      expect(result).toBeFalsy();
    });
  });

  describe('case UNKNOWN_STATE', () => {
    it('should return the current state', () => {
      const initialState = true;
      deepFreeze(initialState);

      const result = loadingReducer(initialState, {type: 'UNKNOWN_STATE'} as any);

      expect(result).toBeTruthy();
    });
  });

  describe('case SET_LOADING', () => {
    it('should set the loading to true', () => {
      const initialState = false;
      deepFreeze(initialState);

      const result = loadingReducer(initialState, new SetLoading());

      expect(result).toBeTruthy();
    });
  });

  describe('case LOADING_DONE', () => {
    it('should set the loading to false', () => {
      const initialState = true;
      deepFreeze(initialState);

      const result = loadingReducer(initialState, new LoadingDone());

      expect(result).toBeFalsy();
    });
  });
});
