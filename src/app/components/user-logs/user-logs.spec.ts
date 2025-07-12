import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLogs } from './user-logs';

describe('UserLogs', () => {
  let component: UserLogs;
  let fixture: ComponentFixture<UserLogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLogs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLogs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
