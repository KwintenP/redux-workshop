import {type} from '../util';
import {Action, ActionReducer} from '@ngrx/store';
import {ApplicationState} from '../root-reducer';

const actionTypes = {
  RESET_STORE: type<'RESET_STORE'>('RESET_STORE')
};

export class ResetStore implements Action {
  type = actionTypes.RESET_STORE;
}

export function reset(reducer, initialState?: ApplicationState): ActionReducer<ApplicationState> {
  return (state: ApplicationState, action: Action) => {
    if (action.type === actionTypes.RESET_STORE) {
      return initialState;
    }
    if (!initialState) {
      initialState = reducer(state, action);
      return initialState;
    }
    return reducer(state, action);
  };
}
