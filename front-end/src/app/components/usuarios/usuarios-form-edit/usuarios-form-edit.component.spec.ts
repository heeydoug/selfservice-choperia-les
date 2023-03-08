import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosFormEditComponent } from './usuarios-form-edit.component';

describe('UsuariosFormEditComponent', () => {
  let component: UsuariosFormEditComponent;
  let fixture: ComponentFixture<UsuariosFormEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosFormEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
