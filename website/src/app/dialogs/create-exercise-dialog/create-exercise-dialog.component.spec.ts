import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExerciseDialogComponent } from './create-exercise-dialog.component';

describe('CreateExerciseDialogComponent', () => {
  let component: CreateExerciseDialogComponent;
  let fixture: ComponentFixture<CreateExerciseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateExerciseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExerciseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
