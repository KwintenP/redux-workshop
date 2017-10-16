import {Injectable} from '@angular/core';
import {StarWarsBackendService} from '../services/star-wars-backend.service';

@Injectable()
export class SwapiSandbox {


  constructor(private starwarsBackendService: StarWarsBackendService) {
    starwarsBackendService.getAllCharacters();
  }
}
