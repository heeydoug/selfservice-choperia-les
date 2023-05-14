import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoriosGastosClientesComponent } from './relatorios-gastos-clientes.component';

describe('RelatoriosGastosClientesComponent', () => {
  let component: RelatoriosGastosClientesComponent;
  let fixture: ComponentFixture<RelatoriosGastosClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatoriosGastosClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatoriosGastosClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
