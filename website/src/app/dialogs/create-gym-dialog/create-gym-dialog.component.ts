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
import { GymCreatePhotoDto } from '../../dto/gym-photo-dto';
import { UploadGymService } from '../../services/upload-gym.service';

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
 
  form: FormGroup;
 

  
 
  constructor(private uploadService:UploadGymService,private geoService: GeoService,private snackBar: MatSnackBar, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
  private gymService: GymService, public dialogRef: MatDialogRef<CreateGymDialogComponent>) { }

  ngOnInit() {
    
    this.createForm();
    
  }


 
 
  createForm() {
   
    const newForm: FormGroup = this.fb.group ({
      name: [null, Validators.compose ([ Validators.required ])],
      address: [null, Validators.compose ([ Validators.required ])],
      zipcode: [null, Validators.compose ([ Validators.required, Validators.pattern(/^[0-9]{4,10}$/)])],
      province: [null, Validators.compose ([ Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)  ])],
      city: [null, Validators.compose ([ Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)  ])],
      price: [null, Validators.compose ([ Validators.required ])],
      description: [null, Validators.compose ([ Validators.required ])],
      picture: [null, Validators.compose ([ Validators.required])]

    });
    this.form = newForm;
  }
  addGym() {
    
    const gymCreateDto = <GymCreateDto> this.form.value;

    this.gymService.createGym(gymCreateDto).subscribe(
      gym => {
        this.dialogRef.close('confirm');
      }
    );
  }
 
  onSubmit() {
        let newGym: GymCreateDto = <GymCreateDto>this.form.value;
        
      //newGym = this.getPosition(newGym);
      let position = '';

      //obtain geolocation
      this.geoService.getLocation(newGym.address).subscribe(r => {
      
        position = r.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
        position = position+','+r.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
        newGym.position = position;
        //newGym.picture='foto'
      
      this.gymService.createGym(newGym).subscribe(r => this.dialogRef.close('confirm'),
      e => this.snackBar.open('Failed to create.', 'Close', {duration: 3000}));
  
      })
      
      
  }
  
  //foto

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    this.files = new Set();
    for (const key in files) {
      if (!isNaN(parseInt(key, 10))) {
        this.files.add(files[key]);
      }
    }
  }
  uploadImage(newGym: GymCreatePhotoDto){
//FOTO SUBIDA
       // if everything was uploaded already, just close the dialog
       if (this.uploadSuccessful) {
        return this.dialogRef.close('confirm');
  
        
      }
  
      // set the component state to "uploading"
      this.uploading = true;
  
      // start the upload and save the progress map
      //newGym.zipcode = newGym.zipcode.toString();
      
      this.progress = this.uploadService.upload(this.files, newGym);
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
         //FOTO SUBIDA
  }
  closeDialog() {
    const newGym :GymCreatePhotoDto = <GymCreatePhotoDto>this.form.value;
     //newGym = this.getPosition(newGym);
     let position = '';

     //obtain geolocation
     this.geoService.getLocation(newGym.address).subscribe(r => {
     
       position = r.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
       position = position+','+r.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
       newGym.position = position;
       this.uploadImage(newGym);
     
       
      
     })
    
  }
  //foto


}
