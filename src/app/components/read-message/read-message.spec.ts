import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMessage } from './read-message';

describe('ReadMessage', () => {
  let component: ReadMessage;
  let fixture: ComponentFixture<ReadMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadMessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
