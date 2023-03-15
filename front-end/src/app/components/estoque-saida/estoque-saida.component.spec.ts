import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueSaidaComponent } from './estoque-saida.component';

describe('EstoqueSaidaComponent', () => {
  let component: EstoqueSaidaComponent;
  let fixture: ComponentFixture<EstoqueSaidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstoqueSaidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstoqueSaidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
