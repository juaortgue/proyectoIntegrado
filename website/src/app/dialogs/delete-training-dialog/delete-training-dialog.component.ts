import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-delete-training-dialog',
  templateUrl: './delete-training-dialog.component.html',
  styleUrls: ['./delete-training-dialog.component.scss']
})
export class DeleteTrainingDialogComponent implements OnInit {

  public form: FormGroup;
  checkedRobot: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private trainingService: TrainingService, public dialogRef: MatDialogRef<DeleteTrainingDialogComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  captcha() {
    if (this.checkedRobot) {
      return true;
    } else {
      return false;
    }
  }
  // delete category
  delete() {
    this.trainingService.delete(this.data.training.id).subscribe(result => {
      this.dialogRef.close('confirm');
    }, error => this.snackBar.open('There was an error when trying to delete this training.', 'Close', { duration: 3000 }));
  }

}
