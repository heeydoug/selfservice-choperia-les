import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaClientesEditarComponent } from './entrada-clientes-editar.component';

describe('EntradaClientesEditarComponent', () => {
  let component: EntradaClientesEditarComponent;
  let fixture: ComponentFixture<EntradaClientesEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntradaClientesEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntradaClientesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
