import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-category-dialog',
  templateUrl: './delete-category-dialog.component.html',
  styleUrls: ['./delete-category-dialog.component.scss']
})
export class DeleteCategoryDialogComponent implements OnInit {

  public form: FormGroup;
  checkedRobot: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private categoryService: CategoryService, public dialogRef: MatDialogRef<DeleteCategoryDialogComponent>,
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
    this.categoryService.deleteCategory(this.data.category.id).subscribe(result => {
      this.dialogRef.close('confirm');
    }, error => this.snackBar.open('There was an error when trying to delete this gym.', 'Close', { duration: 3000 }));
  }

}
