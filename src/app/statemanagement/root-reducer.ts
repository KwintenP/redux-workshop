import {StarWarsCharacter} from '../modules/swapi/entities/star-wars-character.entity';
import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import {characterReducer} from './data/characters';
import {environment} from '../../environments/environment';
import {storeFreeze} from 'ngrx-store-freeze';
import {loadingReducer} from './ui/loading';
import {reset} from './metareducers/reset.reducer';

export type ApplicationState = Readonly<{
  characters: Array<StarWarsCharacter>;
  loading: boolean;
}>;

export const rootReducer: ActionReducerMap<ApplicationState> = {
  characters: characterReducer,
  loading: loadingReducer,
};

export const metaReducers: MetaReducer<ApplicationState>[] = environment.production ? [reset] : [storeFreeze, reset];
