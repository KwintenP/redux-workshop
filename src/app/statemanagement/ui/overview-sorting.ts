import {type} from '../util';

export const ActionTypes = {
  SET_SORTING: type('SET_SORTING') as 'SET_SORTING',
};

export class SetSorting {
  readonly type = ActionTypes.SET_SORTING;

  constructor(public payload: { columnName: string }) {
  }
}

type Actions = SetSorting;

export function overviewSortingReducer(state: { columnName?: string, direction?: 'ASC' | 'DESC' } = {}, action: Actions): { columnName?: string, direction?: 'ASC' | 'DESC' } {
return state;
}
