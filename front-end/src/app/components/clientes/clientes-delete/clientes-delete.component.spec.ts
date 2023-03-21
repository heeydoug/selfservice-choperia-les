import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesDeleteComponent } from './clientes-delete.component';

describe('ClientesDeleteComponent', () => {
  let component: ClientesDeleteComponent;
  let fixture: ComponentFixture<ClientesDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
