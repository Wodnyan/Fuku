import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCodeReviewComponent } from './create-code-review.component';

describe('CreateCodeReviewComponent', () => {
  let component: CreateCodeReviewComponent;
  let fixture: ComponentFixture<CreateCodeReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCodeReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCodeReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
