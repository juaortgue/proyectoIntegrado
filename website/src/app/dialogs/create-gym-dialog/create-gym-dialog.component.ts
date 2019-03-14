import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GymService } from 'src/app/services/gym.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import * as SampleJson from '../../../assets/province.json';
import * as Cities from '../../../assets/cities.json';
import { GymCreateDto } from 'src/app/dto/gym-create.dto';

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
  allProvinces;
  allCitiesFiltered: any[] = [];
  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
  private gymService: GymService, public dialogRef: MatDialogRef<CreateGymDialogComponent>) { }

  ngOnInit() {
    // this.allProvinces = Pselect.provincesData;
    this.allProvinces = SampleJson;
    this.allProvinces = this.transform(this.allProvinces);
    this.createForm();
    if (this.data) {
      this.edit = true;
      this.gymId = this.data.gym.id;
    } else {
      this.edit = false;
    }
  }
  transform(objects: any = []) {
    return Object.values(objects);
  }

  /*public getJSON(): Observable<any> {
    return this.http.get('../../util/province.json')
                    .map((res: any) => res.json())
                    .catch((error: any) => console.log(error));

}*/
  /*onProvinceSelected = function (event) {
    var province = event.target.value;
    // Remove current municipe elements
    this._munElement.innerHTML = '';
  
    // Append new municipes list filtered by selected province
    for (var i = 0; i < municipesData.length; i++) {
      var municipe = municipesData[i];
      if (municipe.id.indexOf(province) === 0) {
        _addOption(this._munElement, municipe.nm, municipe.id);
      }
    }
  };*/
  filterCities(){
    var allCities = this.transform(Cities);
    var province = this.form.get('province').value;
    for (var i = 0; i < allCities.length; i++) {
      var municipe = allCities[i];
      
      if (municipe.id.indexOf(province) === 0) {
        this.allCitiesFiltered.push(municipe);
      }
    }
    
    this.form.controls['city'].setValue(this.allCitiesFiltered);
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
  /*addGym() {
    const categoryCreateDto = new GymCreateDto(this.form.get('name'), this.form.get('address'), this.form.get('price'),'foto',
    this.form.get('city'), this.form.get('zipcode'), this.form.get('description'), this.form.get('position'), this.form.get('province'));
    this.categoryService.createCategory(categoryCreateDto).subscribe(
      category => {
        this.dialogRef.close('confirm');
      }
    );
  }*/

}