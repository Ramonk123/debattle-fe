import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeIslandComponent } from './make-island.component';

describe('MakeIslandComponent', () => {
  let component: MakeIslandComponent;
  let fixture: ComponentFixture<MakeIslandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakeIslandComponent]
    });
    fixture = TestBed.createComponent(MakeIslandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
