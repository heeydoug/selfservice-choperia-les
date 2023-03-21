import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChopUpdateComponent } from './chop-update.component';

describe('ChopUpdateComponent', () => {
  let component: ChopUpdateComponent;
  let fixture: ComponentFixture<ChopUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChopUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChopUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
