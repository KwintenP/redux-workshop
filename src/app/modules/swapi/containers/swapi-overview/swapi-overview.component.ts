import {Component, OnInit} from '@angular/core';
import {StarWarsService} from '../../services/star-wars.service';
import {StarWarsCharacter} from '../../entities/star-wars-character.entity';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {error, success} from 'toastr';
import {ApplicationState} from '../../../../statemanagement/root-reducer';
import {Store} from '@ngrx/store';
import {AddCharacter, SetAllCharacters} from '../../../../statemanagement/data/characters';
import {StarWarsBackendService} from '../../services/star-wars-backend.service';
import {LoadingDone, SetLoading} from '../../../../statemanagement/ui/loading';

@Component({
  selector: 'app-swapi-overview',
  template: `
    <app-topbar (reload)="loadData()"></app-topbar>
    <div class="main">
      <div class="sidebar">
        <app-search-character
          [data]="data$ | async"
          [spinnerVisible]="loading$ | async"
          (nameChanges)="nameChanged($event)"
          (itemSelect)="itemSelected($event)"></app-search-character>
        <app-features></app-features>
      </div>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./swapi-overview.component.scss']
})
export class SwapiOverviewComponent implements OnInit {
  loading$; // TODO select data from the store
  name$ = new Subject<string>();
  data$;

  constructor(
              private starwarsService: StarWarsService,
              private starwarsBackendService: StarWarsBackendService) {
  }

  ngOnInit() {
    // TODO: (1) Listen to the name$
    // debounce it for 200ms
    // filter out the same values, filter out values with length shorter than 2
    // fetch data and get the results


    // TODO: (2)
    // When the data changes or an item is selected reset the data;
  }

  nameChanged(event) {
    this.name$.next(event);
  }

  itemSelected(event) {
    event.rating = 1;
    this.starwarsBackendService.addCharacter(event);
    // TODO: make the call and add the result to the store
    // show a toastr in case of success and one in case of error
  }

  loadData() {
    this.starwarsBackendService.getAllCharacters();
    // TODO: listen to the stream and update the store
  }
}
