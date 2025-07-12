import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileLogs } from './file-logs';

describe('FileLogs', () => {
  let component: FileLogs;
  let fixture: ComponentFixture<FileLogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileLogs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileLogs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
