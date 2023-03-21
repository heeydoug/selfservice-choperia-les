import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesUpdateComponent } from './clientes-update.component';

describe('ClientesUpdateComponent', () => {
  let component: ClientesUpdateComponent;
  let fixture: ComponentFixture<ClientesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
