import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GymService } from 'src/app/services/gym.service';
import { GymResponse } from 'src/app/interfaces/gym-response';
import { GymOneResponse } from 'src/app/interfaces/gym-one-response';
@Component({
  selector: 'app-edit-gym-dialog',
  templateUrl: './edit-gym-dialog.component.html',
  styleUrls: ['./edit-gym-dialog.component.scss']
})
export class EditGymDialogComponent implements OnInit {
  public form: FormGroup;
  gym:GymOneResponse;
  constructor(private fb: FormBuilder, private gymService: GymService,
    public dialogRef: MatDialogRef<EditGymDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.gym = this.data.gym;
    this.createFormEmpty();
    console.log(this.data)
    this.getOne();
    
    
  }
  createForm() {
    this.form = this.fb.group({
      name: [this.gym.name, Validators.compose ([ Validators.required ])],
      address: [this.gym.address, Validators.compose ([ Validators.required ])],
      zipcode: [this.gym.zipcode, Validators.compose ([ Validators.required ])],
      province: [this.gym.province, Validators.compose ([ Validators.required ])],
      city: [this.gym.city, Validators.compose ([ Validators.required ])],
      price: [this.gym.price, Validators.compose ([ Validators.required ])],
      description: [this.gym.description, Validators.compose ([ Validators.required ])]
    });
  }
  createFormEmpty() {
    this.form = this.fb.group({
      name: [null, Validators.compose ([ Validators.required ])],
      address: [null, Validators.compose ([ Validators.required ])],
      zipcode: [null, Validators.compose ([ Validators.required ])],
      province: [null, Validators.compose ([ Validators.required ])],
      city: [null, Validators.compose ([ Validators.required ])],
      price: [null, Validators.compose ([ Validators.required ])],
      description: [null, Validators.compose ([ Validators.required ])]
    });
  }
  
  getOne(){
    
    this.gymService.getOneGym(this.data.gym.id).subscribe(gymOneResponse=>{
      console.log('exitooo')
      console.log(gymOneResponse);
      this.gym = gymOneResponse;
      this.createForm();

    });
  }
}
