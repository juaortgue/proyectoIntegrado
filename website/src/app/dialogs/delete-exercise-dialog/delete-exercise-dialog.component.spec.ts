import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteExerciseDialogComponent } from './delete-exercise-dialog.component';

describe('DeleteExerciseDialogComponent', () => {
  let component: DeleteExerciseDialogComponent;
  let fixture: ComponentFixture<DeleteExerciseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteExerciseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteExerciseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
