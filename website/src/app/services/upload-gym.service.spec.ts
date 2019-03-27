import { TestBed, inject } from '@angular/core/testing';

import { UploadGymService } from './upload-gym.service';

describe('UploadGymService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadGymService]
    });
  });

  it('should be created', inject([UploadGymService], (service: UploadGymService) => {
    expect(service).toBeTruthy();
  }));
});
