import { TestBed, inject } from '@angular/core/testing';

import { UploadTrainingService } from './upload-training.service';

describe('UploadTrainingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadTrainingService]
    });
  });

  it('should be created', inject([UploadTrainingService], (service: UploadTrainingService) => {
    expect(service).toBeTruthy();
  }));
});
