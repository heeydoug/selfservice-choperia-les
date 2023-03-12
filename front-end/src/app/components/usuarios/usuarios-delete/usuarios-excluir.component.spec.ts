import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosExcluirComponent } from './usuarios-excluir.component';

describe('UsuariosExcluirComponent', () => {
  let component: UsuariosExcluirComponent;
  let fixture: ComponentFixture<UsuariosExcluirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosExcluirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
