import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarPrecoSelfserviceComponent } from './alterar-preco-selfservice.component';

describe('AlterarPrecoSelfserviceComponent', () => {
  let component: AlterarPrecoSelfserviceComponent;
  let fixture: ComponentFixture<AlterarPrecoSelfserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterarPrecoSelfserviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlterarPrecoSelfserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
