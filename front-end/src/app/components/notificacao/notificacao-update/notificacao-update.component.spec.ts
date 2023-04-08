import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacaoUpdateComponent } from './notificacao-update.component';

describe('NotificacaoUpdateComponent', () => {
  let component: NotificacaoUpdateComponent;
  let fixture: ComponentFixture<NotificacaoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificacaoUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacaoUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
