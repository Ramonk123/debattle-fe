import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusBarCategoriesFourComponent } from './status-bar-categories-four.component';

describe('StatusBarCategoriesFourComponent', () => {
  let component: StatusBarCategoriesFourComponent;
  let fixture: ComponentFixture<StatusBarCategoriesFourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusBarCategoriesFourComponent]
    });
    fixture = TestBed.createComponent(StatusBarCategoriesFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
