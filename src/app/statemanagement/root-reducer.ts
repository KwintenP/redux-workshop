import {StarWarsCharacter} from '../modules/swapi/entities/star-wars-character.entity';
import {ActionReducer, ActionReducerMap, combineReducers, MetaReducer} from '@ngrx/store';
import {characterReducer} from './data/characters';
import {environment} from '../../environments/environment';
import {storeFreeze} from 'ngrx-store-freeze';
import {loadingReducer} from './ui/loading';
import {reset} from './metareducers/reset.reducer';
import {overviewSortingReducer} from './ui/overview-sorting';

export type ApplicationState = Readonly<{
  data: {
    characters: Array<StarWarsCharacter>
  };
  ui: {
    loading: boolean,
    overviewSorting: {columnName?: string, direction?: 'ASC'|'DESC'}
  };
}>;

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

export const metaReducers: MetaReducer<ApplicationState>[] = environment.production ? [reset] : [storeFreeze, reset];
