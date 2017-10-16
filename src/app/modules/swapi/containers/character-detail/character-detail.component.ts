import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {SwapiSandbox} from '../../sandboxes/swapi.sandbox';

@Component({
  selector: 'app-character-detail',
  template: `
    <form novalidate [formGroup]="characterForm" (ngSubmit)="saveCharacter()">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" formControlName="name">
      </div>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" formControlName="name">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  `,
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {
  characterForm;

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private sandbox: SwapiSandbox) {
    this.characterForm = this.formBuilder.group({
      name: '',
      gender: '',
      rating: '',
    });

    this.activatedRoute.params
      .map(params => params['id'])
      .switchMap(id => sandbox.getCharacter(id))
      .subscribe(console.log);
  }

  ngOnInit() {
  }

  saveCharacter() {
    this.sandbox.editCharacter()
  }

}
