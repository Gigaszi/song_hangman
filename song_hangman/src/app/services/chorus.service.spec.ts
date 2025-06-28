import { TestBed } from '@angular/core/testing';

import { ChorusService } from './chorus.service';

describe('ChorusService', () => {
  let service: ChorusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChorusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
