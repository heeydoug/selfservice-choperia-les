import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosListComponent } from './produtos-list.component';

describe('ProdutosListComponent', () => {
  let component: ProdutosListComponent;
  let fixture: ComponentFixture<ProdutosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
