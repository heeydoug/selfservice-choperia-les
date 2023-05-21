import { TestBed } from '@angular/core/testing';

import { BalancaService } from './balanca.service';

describe('BalancaService', () => {
  let service: BalancaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BalancaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
