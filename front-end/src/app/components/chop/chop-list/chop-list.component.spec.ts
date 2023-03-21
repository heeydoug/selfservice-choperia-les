import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChopListComponent } from './chop-list.component';

describe('ChopListComponent', () => {
  let component: ChopListComponent;
  let fixture: ComponentFixture<ChopListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChopListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
