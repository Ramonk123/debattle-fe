import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusBarCategoriesComponent } from './status-bar-categories.component';

describe('StatusBarCategoriesComponent', () => {
  let component: StatusBarCategoriesComponent;
  let fixture: ComponentFixture<StatusBarCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusBarCategoriesComponent]
    });
    fixture = TestBed.createComponent(StatusBarCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
