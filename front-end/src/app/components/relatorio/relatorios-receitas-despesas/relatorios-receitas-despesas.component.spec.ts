import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoriosReceitasDespesasComponent } from './relatorios-receitas-despesas.component';

describe('RelatoriosReceitasDespesasComponent', () => {
  let component: RelatoriosReceitasDespesasComponent;
  let fixture: ComponentFixture<RelatoriosReceitasDespesasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatoriosReceitasDespesasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatoriosReceitasDespesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
