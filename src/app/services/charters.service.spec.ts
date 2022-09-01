import { TestBed } from '@angular/core/testing';

import { ChartersService } from './charters.service';

describe('ChartersService', () => {
  let service: ChartersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
