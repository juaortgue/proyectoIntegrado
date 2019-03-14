import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GymService } from 'src/app/services/gym.service';
const Pselect = require('../create-gym-dialog/pselect.js');
@Component({
  selector: 'app-create-gym-dialog',
  templateUrl: './create-gym-dialog.component.html',
  styleUrls: ['./create-gym-dialog.component.scss']
})
export class CreateGymDialogComponent implements OnInit {
  edit: boolean;
  name: string;
  form: FormGroup;
  categoryId: string;
  allProvinces;
  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
  private gymService: GymService, public dialogRef: MatDialogRef<CreateGymDialogComponent>) { }

  ngOnInit() {
    this.allProvinces = Pselect.provincesData;
    console.log(this.allProvinces)
    this.createForm();
    if (this.data) {
      this.edit = true;
      this.categoryId = this.data.category.id;
    } else {
      this.edit = false;
    }
  }
  createForm() {
    if (this.data) {
      const editForm: FormGroup = this.fb.group ({
        name: [this.data.gym.name, Validators.compose ([ Validators.required ])],
        address: [this.data.gym.address, Validators.compose ([ Validators.required ])],
        zipcode: [this.data.gym.zipcode, Validators.compose ([ Validators.required ])],
        province: [this.data.gym.province, Validators.compose ([ Validators.required ])],
        city: [this.data.gym.city, Validators.compose ([ Validators.required ])],
        price: [this.data.gym.price, Validators.compose ([ Validators.required ])],
        description: [this.data.gym.description, Validators.compose ([ Validators.required ])]



      });
      this.form = editForm;
    } else {
      const newForm: FormGroup = this.fb.group ({
        name: [null, Validators.compose ([ Validators.required ])],
        address: [null, Validators.compose ([ Validators.required ])],
        zipcode: [null, Validators.compose ([ Validators.required ])],
        province: [null, Validators.compose ([ Validators.required ])],
        city: [null, Validators.compose ([ Validators.required ])],
        price: [null, Validators.compose ([ Validators.required ])],
        description: [null, Validators.compose ([ Validators.required ])]
      });
      this.form = newForm;
    }
  }

}
