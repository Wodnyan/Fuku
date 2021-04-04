import { TestBed } from '@angular/core/testing';

import { CodeReviewsService } from './code-reviews.service';

describe('CodeReviewsService', () => {
  let service: CodeReviewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeReviewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
