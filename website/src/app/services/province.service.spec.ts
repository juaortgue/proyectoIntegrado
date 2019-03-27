import { TestBed, inject } from '@angular/core/testing';

import { ProvinceService } from './province.service';

describe('ProvinceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProvinceService]
    });
  });

  it('should be created', inject([ProvinceService], (service: ProvinceService) => {
    expect(service).toBeTruthy();
  }));
});
