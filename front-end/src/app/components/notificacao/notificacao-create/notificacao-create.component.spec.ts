import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacaoCreateComponent } from './notificacao-create.component';

describe('NotificacaoCreateComponent', () => {
  let component: NotificacaoCreateComponent;
  let fixture: ComponentFixture<NotificacaoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificacaoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacaoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
