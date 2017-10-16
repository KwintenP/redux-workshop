import { Component, OnInit } from '@angular/core';
import {ApplicationState} from '../../../../statemanagement/root-reducer';
import {Store} from '@ngrx/store';
import {SwapiSandbox} from '../../sandboxes/swapi.sandbox';

@Component({
  selector: 'app-character-overview',
  template: `test`,
})
export class CharacterOverviewComponent implements OnInit {

  constructor(private sandbox: SwapiSandbox) { }

  ngOnInit() {
  }

}
