import { TestBed } from '@angular/core/testing';

import { EstoqueChopeService } from './estoque-chope.service';

describe('EstoqueChopeService', () => {
  let service: EstoqueChopeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstoqueChopeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
