import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntriesFilters } from './entries-filters';

describe('EntriesFilters', () => {
  let component: EntriesFilters;
  let fixture: ComponentFixture<EntriesFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntriesFilters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntriesFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
