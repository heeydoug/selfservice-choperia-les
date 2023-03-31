import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidaClientesComponent } from './saida-clientes.component';

describe('SaidaClientesComponent', () => {
  let component: SaidaClientesComponent;
  let fixture: ComponentFixture<SaidaClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaidaClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaidaClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
