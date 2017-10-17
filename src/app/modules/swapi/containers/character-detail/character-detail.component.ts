import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SwapiSandbox} from '../../sandboxes/swapi.sandbox';
import {error, success} from 'toastr';

@Component({
  selector: 'app-character-detail',
  template: `
    <form novalidate [formGroup]="characterForm" (ngSubmit)="saveCharacter()">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" formControlName="name">
      </div>
      <div class="form-group">
        <label for="gender">Gender</label>
        <select class="form-control" id="gender" formControlName="gender">
          <option>male</option>
          <option>female</option>
          <option>n/a</option>
        </select>
      </div>
      <div class="form-group">
        <label for="gender">Rating</label>
        <app-rating [rating]="character?.rating" (setRate)="setRating($event)"></app-rating>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  `,
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {
  characterForm;
  id$;
  character;

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private sandbox: SwapiSandbox,
              private router: Router) {
    this.characterForm = this.formBuilder.group({
      name: '',
      gender: '',
      rating: '',
    });

    this.id$ = this.activatedRoute.params
      .map(params => params['id']);

    this.id$
      .switchMap(id => sandbox.getCharacter(id))
      .subscribe(character => {
        this.character = character;
        this.characterForm.patchValue(character);
      });
  }

  ngOnInit() {
  }

  saveCharacter() {
    console.log('triggered');
    this.id$
      .take(1)
      .mergeMap(id => this.sandbox.editCharacter(id, this.characterForm.value))
      .catch(_ => error('updating the character failed'))
      .subscribe(_ => {
        success('Updated succesfully');
        this.router.navigate(['swapi', 'overview']);
      });
  }

  setRating(rating) {
    this.character = {...this.character, rating}
    this.characterForm.patchValue({rating});
  }
}
