import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioEstoqueProdChopeComponent } from './relatorio-estoque-prod-chope.component';

describe('RelatorioEstoqueProdChopeComponent', () => {
  let component: RelatorioEstoqueProdChopeComponent;
  let fixture: ComponentFixture<RelatorioEstoqueProdChopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioEstoqueProdChopeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioEstoqueProdChopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
