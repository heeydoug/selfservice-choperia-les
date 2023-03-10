import { TestBed } from '@angular/core/testing';

import { TelasService } from './telas.service';

describe('TelasService', () => {
  let service: TelasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
