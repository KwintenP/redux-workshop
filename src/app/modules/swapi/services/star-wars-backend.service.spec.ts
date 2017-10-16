import { TestBed, inject } from '@angular/core/testing';

import { StarWarsBackendService } from './star-wars-backend.service';

describe('StarWarsBackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StarWarsBackendService]
    });
  });

  it('should be created', inject([StarWarsBackendService], (service: StarWarsBackendService) => {
    expect(service).toBeTruthy();
  }));
});
