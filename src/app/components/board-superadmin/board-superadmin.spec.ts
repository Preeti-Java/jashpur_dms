import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardSuperadmin } from './board-superadmin';

describe('BoardSuperadmin', () => {
  let component: BoardSuperadmin;
  let fixture: ComponentFixture<BoardSuperadmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardSuperadmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardSuperadmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
