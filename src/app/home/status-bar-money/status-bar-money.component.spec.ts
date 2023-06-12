import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusBarMoneyComponent } from './status-bar-money.component';

describe('StatusBarMoneyComponent', () => {
  let component: StatusBarMoneyComponent;
  let fixture: ComponentFixture<StatusBarMoneyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusBarMoneyComponent]
    });
    fixture = TestBed.createComponent(StatusBarMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
