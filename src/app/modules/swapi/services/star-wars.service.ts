import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publishReplay';
import {StarWarsResult} from '../entities/star-wars-result.entity';

@Injectable()
export class StarWarsService {

  constructor(private http: Http) {

  }

  public getCharacters(page: number = 1, searchTerm?: string): Observable<StarWarsResult> {
    const queryParams = `page=${page}` + (searchTerm ? `&search=${searchTerm}` : '');
    return this.http.get(`https://swapi.co/api/people/?${queryParams}`)
      .map((response: Response) => response.json())
      // small hack to have the 'id' as part of the entity
      .map((data) => {
        return {
          ...data, results: data.results.map(character => ({
            ...character,
            id: character.url.substring(character.url.length - 2, character.url.length - 1)
          }))
        };
      })
      .do((val) => {
        console.log('characters', val);
      });
  }
}
