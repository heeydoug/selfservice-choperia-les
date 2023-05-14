import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioFaltaEstoqueComponent } from './relatorio-falta-estoque.component';

describe('RelatorioFaltaEstoqueComponent', () => {
  let component: RelatorioFaltaEstoqueComponent;
  let fixture: ComponentFixture<RelatorioFaltaEstoqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioFaltaEstoqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioFaltaEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
