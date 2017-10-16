import {Component, OnInit} from '@angular/core';
import {StarWarsService} from '../../services/star-wars.service';
import {StarWarsCharacter} from '../../entities/star-wars-character.entity';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Subject} from 'rxjs/Subject';
import {SwapiSandbox} from '../../sandboxes/swapi.sandbox';

@Component({
  selector: 'app-swapi-overview',
  template: `
    <app-topbar></app-topbar>
    <div class="main">
      <div class="sidebar">
        <app-search-character
          [data]="data$ | async"
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
      .switchMap(val => this.sandbox.getCharacters(1, val))
      .map(data => data.results)
      .merge(this.reset$);
  }

  nameChanged(event) {
    this.name$.next(event);
  }

  itemSelected(event) {
    this.reset$.next([]);
    this.sandbox.addCharacter(event)
      .subscribe(_ => console.log('done'));
  }
}