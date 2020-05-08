import { TestBed } from '@angular/core/testing';

import { RecoursecService } from './recoursec.service';

describe('RecoursecService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecoursecService = TestBed.get(RecoursecService);
    expect(service).toBeTruthy();
  });
});
