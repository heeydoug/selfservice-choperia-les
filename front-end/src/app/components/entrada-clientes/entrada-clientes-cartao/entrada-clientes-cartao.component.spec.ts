import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaClientesCartaoComponent } from './entrada-clientes-cartao.component';

describe('EntradaClientesCartaoComponent', () => {
  let component: EntradaClientesCartaoComponent;
  let fixture: ComponentFixture<EntradaClientesCartaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntradaClientesCartaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntradaClientesCartaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
