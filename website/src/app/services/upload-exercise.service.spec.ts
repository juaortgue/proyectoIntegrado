import { TestBed, inject } from '@angular/core/testing';

import { UploadExerciseService } from './upload-exercise.service';

describe('UploadExerciseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadExerciseService]
    });
  });

  it('should be created', inject([UploadExerciseService], (service: UploadExerciseService) => {
    expect(service).toBeTruthy();
  }));
});
