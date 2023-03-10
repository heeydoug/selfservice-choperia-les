import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosExcluirComponent } from './produtos-excluir.component';

describe('ProdutosExcluirComponent', () => {
  let component: ProdutosExcluirComponent;
  let fixture: ComponentFixture<ProdutosExcluirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosExcluirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutosExcluirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
