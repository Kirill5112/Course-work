import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamUsersListComponent } from './team-users-list.component';

describe('TeamUsersListComponent', () => {
  let component: TeamUsersListComponent;
  let fixture: ComponentFixture<TeamUsersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamUsersListComponent]
    });
    fixture = TestBed.createComponent(TeamUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
