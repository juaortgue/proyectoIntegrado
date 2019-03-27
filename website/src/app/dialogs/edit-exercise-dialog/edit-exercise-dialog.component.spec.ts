import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExerciseDialogComponent } from './edit-exercise-dialog.component';

describe('EditExerciseDialogComponent', () => {
  let component: EditExerciseDialogComponent;
  let fixture: ComponentFixture<EditExerciseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExerciseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExerciseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
