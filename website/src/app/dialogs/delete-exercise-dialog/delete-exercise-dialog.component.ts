import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ExerciseService } from '../../services/exercise.service';

@Component({
  selector: 'app-delete-exercise-dialog',
  templateUrl: './delete-exercise-dialog.component.html',
  styleUrls: ['./delete-exercise-dialog.component.scss']
})
export class DeleteExerciseDialogComponent implements OnInit {

  public form: FormGroup;
  checkedRobot: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private exerciseService: ExerciseService, public dialogRef: MatDialogRef<DeleteExerciseDialogComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit() {

  }
  // check if its a robot with captcha
  captcha() {
    if (this.checkedRobot) {
      return true;
    } else {
      return false;
    }
  }
  // delete gym
  delete() {
    this.exerciseService.delete(this.data.exercise.id).subscribe(result => {
      this.dialogRef.close('confirm');
    }, error => this.snackBar.open('There was an error when trying to delete this exercise.', 'Close', { duration: 3000 }));
  }

}
