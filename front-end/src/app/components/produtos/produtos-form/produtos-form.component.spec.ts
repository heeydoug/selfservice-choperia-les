import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosFormComponent } from './produtos-form.component';

describe('ProdutosFormComponent', () => {
  let component: ProdutosFormComponent;
  let fixture: ComponentFixture<ProdutosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
