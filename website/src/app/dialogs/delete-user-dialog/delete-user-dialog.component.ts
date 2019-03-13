import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent implements OnInit {

  public form: FormGroup;
  checkedRobot: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private userService: UserServiceService, public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit() {

  }
  //check if its a robot with captcha
  captcha() {
    if (this.checkedRobot) {
      return true;
    } else {
      return false;
    }
  }
  //delete user
  delete() {
    this.userService.remove(this.data.user.id).subscribe(result => {
      this.dialogRef.close('confirm');
    }, error => this.snackBar.open('There was an error when trying to delete this user.', 'Close', { duration: 3000 }));
  }

}
