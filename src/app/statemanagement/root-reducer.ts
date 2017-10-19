import {StarWarsCharacter} from '../modules/swapi/entities/star-wars-character.entity';
import {ActionReducerMap, combineReducers} from '@ngrx/store';
import {characterReducer} from './data/characters';
import {loadingReducer} from './ui/loading';
import {overviewSortingReducer} from './ui/overview-sorting';
import {InjectionToken} from '@angular/core';

export type ApplicationState = Readonly<{
  data: {
    characters: Array<StarWarsCharacter>
  };
  ui: {
    loading: boolean,
    overviewSorting: { columnName?: string, direction?: 'ASC' | 'DESC' }
  };
}>;

export const reducerToken = new InjectionToken<ActionReducerMap<ApplicationState>>('Reducers');

const dataReducers = combineReducers({
  characters: characterReducer
});

const uiReducers = combineReducers({
  loading: loadingReducer,
  overviewSorting: overviewSortingReducer
});

export const rootReducer: ActionReducerMap<ApplicationState> = {
  data: dataReducers,
  ui: uiReducers,
};

export function getReducers() {
  return rootReducer;
}

export const reducerProvider = [
  {provide: reducerToken, useFactory: getReducers}
];
