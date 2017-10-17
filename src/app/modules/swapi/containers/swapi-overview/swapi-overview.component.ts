import {Component, OnInit} from '@angular/core';
import {StarWarsService} from '../../services/star-wars.service';
import {StarWarsCharacter} from '../../entities/star-wars-character.entity';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Subject} from 'rxjs/Subject';
import {SwapiSandbox} from '../../sandboxes/swapi.sandbox';
import {success, error} from 'toastr';

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
  loading$ = this.sandbox.loading$;
  name$ = new Subject<string>();
  data$;

  reset$ = new BehaviorSubject<Array<StarWarsCharacter>>([]);

  constructor(private sandbox: SwapiSandbox) {
  }

  ngOnInit() {
    this.data$ = this.name$
      .debounceTime(200)
      .distinctUntilChanged()
      .filter(val => val.length > 1)
      .do(_ => this.sandbox.setLoading())
      .switchMap(val => this.sandbox.getCharacters(1, val))
      .do(_ => this.sandbox.loadingDone())
      .map(data => data.results)
      .merge(this.reset$);
  }

  nameChanged(event) {
    this.reset$.next([]);
    this.name$.next(event);
  }

  itemSelected(event) {
    this.reset$.next([]);
    this.sandbox.addCharacter(event)
      .catch(_ => error('character adding failed'))
      .subscribe(_ => success('character added'));
  }

  loadData() {
    this.sandbox.loadData();
  }
}
