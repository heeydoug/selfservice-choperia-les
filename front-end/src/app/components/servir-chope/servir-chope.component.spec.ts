import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServirChopeComponent } from './servir-chope.component';

describe('ServirChopeComponent', () => {
  let component: ServirChopeComponent;
  let fixture: ComponentFixture<ServirChopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServirChopeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServirChopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
