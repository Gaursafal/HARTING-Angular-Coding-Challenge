import { TestBed } from '@angular/core/testing';

import { CharacterService, HouseService } from './house.service';

describe('HouseService', () => {
  let service: HouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
