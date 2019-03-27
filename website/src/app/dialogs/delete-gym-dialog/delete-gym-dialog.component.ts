import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { GymService } from 'src/app/services/gym.service';
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';

@Component({
  selector: 'app-delete-gym-dialog',
  templateUrl: './delete-gym-dialog.component.html',
  styleUrls: ['./delete-gym-dialog.component.scss']
})
export class DeleteGymDialogComponent implements OnInit {

  public form: FormGroup;
  checkedRobot: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private gymService: GymService, public dialogRef: MatDialogRef<DeleteCategoryDialogComponent>,
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
    this.gymService.deleteGym(this.data.gym.id).subscribe(result => {
      this.dialogRef.close('confirm');
    }, error => this.snackBar.open('There was an error when trying to delete this user.', 'Close', { duration: 3000 }));
  }

}
