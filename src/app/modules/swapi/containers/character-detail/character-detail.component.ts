import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {error, success} from 'toastr';
import {StarWarsBackendService} from '../../services/star-wars-backend.service';
import {EditCharacter} from '../../../../statemanagement/data/characters';
import {ApplicationState} from '../../../../statemanagement/root-reducer';
import {Store} from '@ngrx/store';

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
              private starWarsBackendService: StarWarsBackendService,
              private router: Router,
              private store: Store<ApplicationState>) {
    this.characterForm = this.formBuilder.group({
      name: '',
      gender: '',
      rating: '',
    });

    this.id$ = this.activatedRoute.params
      .map(params => params['id']);

    this.id$
      .switchMap(id => this.starWarsBackendService.getCharacter(id))
      .subscribe(character => {
        this.character = character;
        this.characterForm.patchValue(character);
      });
  }

  ngOnInit() {
  }

  saveCharacter() {
    this.id$
      .take(1)
      .mergeMap(id => this.starWarsBackendService.editCharacter(id, this.characterForm.value))
      .withLatestFrom(this.id$)
      .map(([updatedCharacter, id]) => this.store.dispatch(new EditCharacter({id, character: updatedCharacter})))
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
