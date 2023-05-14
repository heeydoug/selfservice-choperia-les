import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoriosChopesConsumidosComponent } from './relatorios-chopes-consumidos.component';

describe('RelatoriosChopesConsumidosComponent', () => {
  let component: RelatoriosChopesConsumidosComponent;
  let fixture: ComponentFixture<RelatoriosChopesConsumidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatoriosChopesConsumidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatoriosChopesConsumidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
