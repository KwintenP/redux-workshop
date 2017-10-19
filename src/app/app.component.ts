import { Component } from '@angular/core';
import {ApplicationState} from './statemanagement/root-reducer';
import {Store} from '@ngrx/store';
import {StarWarsBackendService} from './modules/swapi/services/star-wars-backend.service';
import {SetAllCharacters} from './statemanagement/data/characters';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private store: Store<ApplicationState>,
              private starwarsBackendService: StarWarsBackendService) {
    // Load all data at startup
    this.starwarsBackendService.getAllCharacters()
      .subscribe((characters) => this.store.dispatch(new SetAllCharacters({characters})));
  }
}
