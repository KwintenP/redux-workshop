import {type} from '../util';
import {Action} from '@ngrx/store';

export const ActionTypes = {
  SET_LOADING: type('SET_LOADING') as 'SET_LOADING',
  LOADING_DONE: type('LOADING_DONE') as 'LOADING_DONE',
};

export class SetLoading implements Action {
  readonly type = ActionTypes.SET_LOADING;

  constructor() {
  }
}

export class LoadingDone implements Action {
  readonly type = ActionTypes.LOADING_DONE;

  constructor() {
  }
}

export type Actions = SetLoading | LoadingDone;

export function loadingReducer(state: boolean = false, action: Actions) {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return true;
    case ActionTypes.LOADING_DONE:
      return false;
    default:
      return state;
  }
}
