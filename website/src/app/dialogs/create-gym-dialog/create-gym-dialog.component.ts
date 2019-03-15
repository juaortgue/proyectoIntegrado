import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GymService } from 'src/app/services/gym.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { GymCreateDto } from 'src/app/dto/gym-create.dto';
import { CityResponse } from 'src/app/interfaces/city-response.js';
import { GeoService } from 'src/app/services/geo.service';

//const Pselect = require('../create-gym-dialog/pselect.js');
@Component({
  selector: 'app-create-gym-dialog',
  templateUrl: './create-gym-dialog.component.html',
  styleUrls: ['./create-gym-dialog.component.scss']
})
export class CreateGymDialogComponent implements OnInit {
  edit: boolean;
  name: string;
  form: FormGroup;
  gymId: string;
 
  constructor(private geoService: GeoService,private snackBar: MatSnackBar, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
  private gymService: GymService, public dialogRef: MatDialogRef<CreateGymDialogComponent>) { }

  ngOnInit() {
    // this.allProvinces = Pselect.provincesData;
    
    this.createForm();
    if (this.data) {
      this.edit = true;
      this.gymId = this.data.gym.id;
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
  addGym() {
    /*const gymCreateDto = new GymCreateDto(this.form.get('name'), this.form.get('address'), this.form.get('price'),'foto',
    this.form.get('city'), this.form.get('zipcode'), this.form.get('description'), this.form.get('position'), this.form.get('province'));*/
    const gymCreateDto = <GymCreateDto> this.form.value;

    this.gymService.createGym(gymCreateDto).subscribe(
      gym => {
        console.log('se crea')
        console.log(gym)
        this.dialogRef.close('confirm');
      }
    );
  }
  editCategory() {
    const gymCreateDto = <GymCreateDto> this.form.value;
    this.gymService.updateGym(this.gymId, gymCreateDto).subscribe(
      gym => {
        console.log('se actualiza')
        console.log(gym)
        this.dialogRef.close('confirm');
      }
    );
  }
  onSubmit() {
    if (this.edit) {
      const editGym: GymCreateDto = <GymCreateDto>this.form.value;
      console.log('aki kaxo pixa')
      console.log(this.gymId);
      console.log(editGym);
      this.gymService.updateGym(this.gymId, editGym).subscribe(r => {
        this.dialogRef.close('confirm');
      }, e => {
        this.snackBar.open('Failed to edit.', 'Close', {duration: 3000});
      });
    } else {
      let newGym: GymCreateDto = <GymCreateDto>this.form.value;
      newGym = this.getPosition(newGym);
      
      newGym.picture='foto'
      console.log('HERE')
      console.log(newGym);
      this.gymService.createGym(newGym).subscribe(r => this.dialogRef.close('confirm'),
      e => this.snackBar.open('Failed to create.', 'Close', {duration: 3000}));
    }
  }
  getPosition(newGym: GymCreateDto){
    let position ='';
    this.geoService.getLocation(newGym.address).subscribe(r => {
      
      position = r.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
      position = position+','+r.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
      newGym.position = position;
      

    })
    return newGym;
  }

}
