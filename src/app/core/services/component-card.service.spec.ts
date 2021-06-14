import { TestBed } from '@angular/core/testing';

import { ComponentCardService } from './component-card.service';

describe('ComponentCardService', () => {
  let service: ComponentCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
