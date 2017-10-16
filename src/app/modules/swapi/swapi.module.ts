import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwapiOverviewComponent } from './containers/swapi-overview/swapi-overview.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import {StarWarsService} from './services/star-wars.service';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';
import { FeaturesComponent } from './components/features/features.component';
import {RouterModule, Routes} from '@angular/router';
import { CharacterDetailComponent } from './containers/character-detail/character-detail.component';
import { CharacterOverviewComponent } from './containers/character-overview/character-overview.component';
import { SearchCharacterComponent } from './components/search-character/search-character.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    StarWarsService
  ],
  declarations: [SwapiOverviewComponent, TopbarComponent, FeaturesComponent, CharacterDetailComponent, CharacterOverviewComponent, SearchCharacterComponent]
})
export class SwapiModule { }
