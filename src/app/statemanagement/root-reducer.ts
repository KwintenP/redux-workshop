import {StarWarsCharacter} from '../modules/swapi/entities/star-wars-character.entity';
import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import {characterReducer} from './data/characters';
import {environment} from '../../environments/environment';
import {storeFreeze} from 'ngrx-store-freeze';

export type ApplicationState = Readonly<{
  characters: Array<StarWarsCharacter>;
}>;

export const rootReducer: ActionReducerMap<ApplicationState> = {
  characters: characterReducer
};

export const metaReducers: MetaReducer<ApplicationState>[] = environment.production ? [] : [storeFreeze];
