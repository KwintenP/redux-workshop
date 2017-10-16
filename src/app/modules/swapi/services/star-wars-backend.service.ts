import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

@Injectable()
export class StarWarsBackendService {

  constructor(private http: Http) {
  }

  getAllCharacters() {
    return this.http.get('http://localhost:8080/starwarscharacters')
      .map(response => response.json())
      .map(response => response._embedded.starwarscharacters);
  }

  deleteCharacter(id) {
    return this.http.delete(`http://localhost:8080/starwarscharacters/${id}`)
      .map(response => response.json());
  }

  getCharacter(id) {
    return this.http.get(`http://localhost:8080/starwarscharacters/${id}`)
      .map(response => response.json());
  }

  editCharacter(id, character) {
    return this.http.put(`http://localhost:8080/starwarscharacters/${id}`, character)
      .map(response => response.json());
  }

  addCharacter(character) {
    return this.http.post(`http://localhost:8080/starwarscharacters`, character)
      .map(response => response.json());
  }
}
