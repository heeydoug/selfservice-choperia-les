import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChopCreateComponent } from './chop-create.component';

describe('ChopCreateComponent', () => {
  let component: ChopCreateComponent;
  let fixture: ComponentFixture<ChopCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChopCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChopCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
