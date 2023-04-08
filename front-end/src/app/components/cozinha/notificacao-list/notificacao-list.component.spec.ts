import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacaoListComponent } from './notificacao-list.component';

describe('NotificacaoListComponent', () => {
  let component: NotificacaoListComponent;
  let fixture: ComponentFixture<NotificacaoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificacaoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
