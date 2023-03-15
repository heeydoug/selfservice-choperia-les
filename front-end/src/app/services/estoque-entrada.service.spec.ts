import { TestBed } from '@angular/core/testing';

import { EstoqueEntradaService } from './estoque-entrada.service';

describe('EstoqueEntradaService', () => {
  let service: EstoqueEntradaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstoqueEntradaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
