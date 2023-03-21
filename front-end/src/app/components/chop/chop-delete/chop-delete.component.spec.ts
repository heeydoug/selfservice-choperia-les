import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChopDeleteComponent } from './chop-delete.component';

describe('ChopDeleteComponent', () => {
  let component: ChopDeleteComponent;
  let fixture: ComponentFixture<ChopDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChopDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChopDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
