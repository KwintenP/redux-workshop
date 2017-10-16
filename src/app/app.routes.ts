import {Routes} from '@angular/router';
import {SwapiOverviewComponent} from './modules/swapi/containers/swapi-overview/swapi-overview.component';
import {CharacterDetailComponent} from './modules/swapi/containers/character-detail/character-detail.component';
import {CharacterOverviewComponent} from './modules/swapi/containers/character-overview/character-overview.component';

export const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'swapi/overview'
  },
  {
    path: 'swapi',
    component: SwapiOverviewComponent,
    children: [
      {path: '', redirectTo: 'overview', pathMatch: 'full'},
      {path: 'overview', pathMatch: 'full', component: CharacterOverviewComponent},
      {path: 'detail/:id', pathMatch: 'full', component: CharacterDetailComponent}
    ]
  }
];
