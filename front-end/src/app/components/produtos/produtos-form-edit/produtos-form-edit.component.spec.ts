import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosFormEditComponent } from './produtos-form-edit.component';

describe('ProdutosFormEditComponent', () => {
  let component: ProdutosFormEditComponent;
  let fixture: ComponentFixture<ProdutosFormEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosFormEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutosFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
