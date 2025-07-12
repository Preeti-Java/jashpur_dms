import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMessage } from './create-message';

describe('CreateMessage', () => {
  let component: CreateMessage;
  let fixture: ComponentFixture<CreateMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
