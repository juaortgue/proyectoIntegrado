import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GymService } from 'src/app/services/gym.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, forkJoin } from 'rxjs';

import { GymCreateDto } from 'src/app/dto/gym-create.dto';
import { CityResponse } from 'src/app/interfaces/city-response.js';
import { GeoService } from 'src/app/services/geo.service';
import { UploadService } from 'src/app/services/upload.service';

//const Pselect = require('../create-gym-dialog/pselect.js');
@Component({
  selector: 'app-create-gym-dialog',
  templateUrl: './create-gym-dialog.component.html',
  styleUrls: ['./create-gym-dialog.component.scss']
})
export class CreateGymDialogComponent implements OnInit {
  @ViewChild('file') file;
  progress;
  canBeClosed = true;
  primaryButtonText = 'Subir';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  public files: Set<File> = new Set();
  
  edit: boolean;
  name: string;
  form: FormGroup;
  gymId: string;

  
 
  constructor(private uploadService:UploadService,private geoService: GeoService,private snackBar: MatSnackBar, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
  private gymService: GymService, public dialogRef: MatDialogRef<CreateGymDialogComponent>) { }

  ngOnInit() {
    // this.allProvinces = Pselect.provincesData;
    
    this.createForm();
    /*if (this.data) {
      this.edit = true;
      this.gymId = this.data.gym.id;
    } else {
      this.edit = false;
    }*/
    this.edit=false;
  }


  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    this.files = new Set();
    for (const key in files) {
      if (!isNaN(parseInt(key, 10))) {
        this.files.add(files[key]);
      }
    }
  }

  closeDialog() {
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {
      return this.dialogRef.close();
    }

    // set the component state to "uploading"
    this.uploading = true;

    // start the upload and save the progress map
    const gymCreateDto = <GymCreateDto> this.form.value;

    
    this.progress = this.uploadService.upload(this.files,  <GymCreateDto> this.form.value);
    
    // tslint:disable-next-line:forin
    for (const key in this.progress) {
      this.progress[key].progress.subscribe(val => console.log(val));
    }

    // convert the progress map into an array
    const allProgressObservables = [];
    // tslint:disable-next-line:forin
    for (const key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finalizar';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;

    // Hide the cancel-button
    this.showCancelButton = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;

      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;

    });
  }
  
 
  createForm() {
   /* if (this.data) {
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
    }*/
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
  addGym() {
    /*const gymCreateDto = new GymCreateDto(this.form.get('name'), this.form.get('address'), this.form.get('price'),'foto',
    this.form.get('city'), this.form.get('zipcode'), this.form.get('description'), this.form.get('position'), this.form.get('province'));*/
    const gymCreateDto = <GymCreateDto> this.form.value;

    this.gymService.createGym(gymCreateDto).subscribe(
      gym => {
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
    /*if (this.edit) {
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
      
      this.gymService.createGym(newGym).subscribe(r => this.dialogRef.close('confirm'),
      e => this.snackBar.open('Failed to create.', 'Close', {duration: 3000}));
    }*/
    let newGym: GymCreateDto = <GymCreateDto>this.form.value;
      newGym = this.getPosition(newGym);
      let position = '';
      this.geoService.getLocation(newGym.address).subscribe(r => {
      
        position = r.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
        position = position+','+r.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
        newGym.position = position;
        newGym.picture='foto'
      
      this.gymService.createGym(newGym).subscribe(r => this.dialogRef.close('confirm'),
      e => this.snackBar.open('Failed to create.', 'Close', {duration: 3000}));
  
      })
      
      
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
