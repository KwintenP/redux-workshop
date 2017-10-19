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
  loading$ = this.store.select(state => state.ui.loading);
  name$ = new Subject<string>();
  data$;

  reset$ = new BehaviorSubject<Array<StarWarsCharacter>>([]);

  constructor(private store: Store<ApplicationState>,
              private starwarsService: StarWarsService,
              private starwarsBackendService: StarWarsBackendService) {
  }

  ngOnInit() {
    this.data$ = this.name$
      .debounceTime(200)
      .distinctUntilChanged()
      .filter(val => val.length > 1)
      .do(_ => this.store.dispatch(new SetLoading()))
      .switchMap(val => this.starwarsService.getCharacters(1, val))
      .do(_ => this.store.dispatch(new LoadingDone()))
      .map(data => data.results)
      .merge(this.reset$);
  }

  nameChanged(event) {
    this.reset$.next([]);
    this.name$.next(event);
  }

  itemSelected(event) {
    this.reset$.next([]);
    event.rating = 1;
    this.starwarsBackendService.addCharacter(event)
      .map(result => this.store.dispatch(new AddCharacter({character: result})))
      .catch(_ => error('character adding failed'))
      .subscribe((val) => {
        success('character added');
      });
  }

  loadData() {
    this.starwarsBackendService.getAllCharacters()
      .subscribe((characters) => this.store.dispatch(new SetAllCharacters({characters})));
  }
}
