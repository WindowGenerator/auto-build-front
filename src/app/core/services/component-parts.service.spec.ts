import { TestBed } from '@angular/core/testing';

import { ComponentPartsService } from './component-parts.service';

describe('ComponentPartsService', () => {
  let service: ComponentPartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentPartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
