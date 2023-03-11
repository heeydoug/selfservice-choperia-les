import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosDeleteComponent } from './produtos-delete.component';

describe('ProdutosDeleteComponent', () => {
  let component: ProdutosDeleteComponent;
  let fixture: ComponentFixture<ProdutosDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutosDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
