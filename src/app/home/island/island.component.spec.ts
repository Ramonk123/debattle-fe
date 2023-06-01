import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IslandComponent } from './island.component';

describe('IslandComponent', () => {
  let component: IslandComponent;
  let fixture: ComponentFixture<IslandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IslandComponent]
    });
    fixture = TestBed.createComponent(IslandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
