import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueChopeComponent } from './estoque-chope.component';

describe('EstoqueChopeComponent', () => {
  let component: EstoqueChopeComponent;
  let fixture: ComponentFixture<EstoqueChopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstoqueChopeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstoqueChopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
