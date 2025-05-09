import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrangerProfileComponent } from './stranger-profile.component';

describe('StrangerProfileComponent', () => {
  let component: StrangerProfileComponent;
  let fixture: ComponentFixture<StrangerProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StrangerProfileComponent]
    });
    fixture = TestBed.createComponent(StrangerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
