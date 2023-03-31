import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirCodbarrasComponent } from './imprimir-codbarras.component';

describe('ImprimirCodbarrasComponent', () => {
  let component: ImprimirCodbarrasComponent;
  let fixture: ComponentFixture<ImprimirCodbarrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimirCodbarrasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImprimirCodbarrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
