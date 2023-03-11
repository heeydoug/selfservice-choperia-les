import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosCreateComponent } from './produtos-create.component';

describe('ProdutosCreateComponent', () => {
  let component: ProdutosCreateComponent;
  let fixture: ComponentFixture<ProdutosCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
